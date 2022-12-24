import fs from 'node:fs/promises';
import fspath, { dirname } from 'node:path';
import { nextTick } from 'node:process';

import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
  CompletionItemKind,
  CompletionItemProvider,
  CompletionList,
  Disposable,
  ExtensionContext,
  LinesTextDocument,
  Logger,
  Position,
  ProviderResult,
  TextDocument,
  Uri,
  workspace
} from 'coc.nvim';

import { findUp } from 'find-up';
import postcss, { Result } from 'postcss';
import postcssAtRulesVars from 'postcss-at-rules-variables';
import postcssImport from 'postcss-import';
import dataUrl from 'postcss-import/lib/data-url.js';
import loadContent from 'postcss-import/lib/load-content.js';
import postcssNested from 'postcss-nested';
import postcssSafeParser from 'postcss-safe-parser';
import postcssSimpleVars from 'postcss-simple-vars';

import { ExtensionName } from './constants';
import { TrieNode } from './trie';

/**
 * CSS class node
 */
interface CLSlot {
  token: string; /// CSS class
  pathRelative: string;
  source: string;
}

interface Config {
  rootDir: string;
  cssRoots: Set<string>;
  classAttributes: Set<string>;
  maxResults: number;
}

export class CSSClassCompletionProvider implements CompletionItemProvider, Disposable {
  readonly context: ExtensionContext;

  readonly log: Logger;

  readonly watched = new Map<string, Disposable>(); /// Watched file full path => to reset cache

  readonly changed = new Set<string>();

  readonly roots = new Set<string>();

  trie = new TrieNode<CLSlot>();

  cfg!: Config;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.log = context.logger;
  }

  clearState() {
    this.roots.clear();
    this.trie.clear();
    this.changed.clear();
    this.watched.forEach((v) => v.dispose());
    this.watched.clear();
  }

  dispose() {
    this.clearState();
  }

  async jsonFileGet(path: string): Promise<any> {
    try {
      const buf = await fs.readFile(path);
      return JSON.parse(buf.toString('utf8')) || {};
    } catch (_) {
      return {};
    }
  }

  async configure(uri: Uri): Promise<Config> {
    const cfg: Config = {
      rootDir: workspace.root,
      cssRoots: new Set(),
      classAttributes: new Set(),
      maxResults: 0,
    };

    const cwd = dirname(uri.path);
    let val = await findUp('package.json', { stopAt: workspace.root, cwd });
    if (val) {
      val = fspath.dirname(val);
    }
    cfg.rootDir = fspath.resolve(val || workspace.root);

    val = await findUp(`.${ExtensionName}.json`, { stopAt: workspace.root, cwd });
    if (val) {
      const json = await this.jsonFileGet(val);
      (json[`${ExtensionName}.cssRoots`] || []).forEach((r) => cfg.cssRoots.add(fspath.resolve(cfg.rootDir, r)));
      (json[`${ExtensionName}.classAttributes`] || []).forEach((r) => cfg.classAttributes.add(r));
      cfg.maxResults = parseInt(json[`${ExtensionName}.maxResults`]) || 0;
    }

    if (cfg.cssRoots.size == 0) {
      workspace
        .getConfiguration(ExtensionName, uri.toString())
        .get<string[]>('cssRoots', [])
        .forEach((r) => cfg.cssRoots.add(fspath.resolve(cfg.rootDir, r)));
    }

    if (cfg.maxResults < 1) {
      cfg.maxResults = workspace.getConfiguration(ExtensionName, uri.toString()).get<number>('maxResults', 20);
    }

    workspace
      .getConfiguration(ExtensionName, uri.toString())
      .get<string[]>('classAttributes', [])
      .forEach((r) => cfg.classAttributes.add(r));

    workspace
      .getConfiguration('tailwindCSS', uri.toString())
      .get<string[]>('classAttributes', [])
      .forEach((r) => cfg.classAttributes.add(r));

    if (cfg.classAttributes.size == 0) {
      cfg.classAttributes.add('class');
    }

    if (cfg.cssRoots.size == 0) {
      cfg.cssRoots.add(fspath.resolve(cfg.rootDir, 'index.css'));
    }

    return cfg;
  }

  async init(doc: TextDocument): Promise<boolean> {
    if (this.cfg) {
      return true;
    }
    const uri = Uri.parse(doc.uri);
    if (!workspace.root || uri.scheme !== 'file') {
      return false;
    }
    this.cfg = await this.configure(uri);
    await this.rootsImport([...this.cfg.cssRoots]);
    return true;
  }

  pathResolve(p: string): string | undefined {
    const { rootDir } = this.cfg;
    if (!fspath.isAbsolute(p)) {
      p = fspath.join(rootDir, p);
    }
    const result = fspath.relative(rootDir, p);
    if (result != '') {
      p = result;
    }
    if (fspath.isAbsolute(p)) {
      return undefined;
    }
    return p;
  }

  async rootsImport(paths: string[]) {
    return Promise.all(
      paths
        .map((v) => this.pathResolve(v))
        .filter((v) => v !== undefined)
        .map((v) => {
          const path = fspath.join(this.cfg.rootDir, v!);
          this.roots.add(path);
          return this.updateRoot(path);
        })
    );
  }

  onFilesChanged() {
    const changed = [...this.changed];
    this.updateRoots().finally(() => {
      changed.forEach((c) => this.changed.delete(c));
      if (this.changed.size > 0) {
        nextTick(this.onFilesChanged);
      }
    });
  }

  onFileChangedRaw(uri: Uri) {
    const path = uri.path;
    if (this.changed.has(path)) {
      return;
    }
    if (this.changed.size == 0) {
      this.changed.add(path);
      // Debounce
      setTimeout(() => {
        this.onFilesChanged();
      }, 1000);
    } else {
      this.changed.add(path);
    }
  }

  async watchFile(path: string, listener: (uri: Uri) => void) {
    const relative = fspath.relative(workspace.root, path);
    if (this.watched.has(path)) {
      return;
    }
    const watcher = workspace.createFileSystemWatcher(relative);
    watcher.onDidChange(listener);
    watcher.onDidCreate(listener);
    watcher.onDidDelete(listener);
    this.watched.set(path, watcher);
  }

  fileLoad(path: string) {
    if (dataUrl.isValid()) {
      return loadContent(path);
    } else {
      return loadContent(path).finally(() => {
        this.watchFile(path, this.onFileChangedRaw.bind(this));
      });
    }
  }

  async updateRoots() {
    return Promise.all([...this.roots].map((p) => this.updateRoot(p)));
  }

  async processCSSResult(result: Result, pathRelative: string, trie: TrieNode<CLSlot>) {
    const selectors = new Set<CLSlot>();
    result.root.walk((n) => {
      if (n.type === 'rule' && n.selector) {
        let file = n?.source?.input?.file;
        if (file) {
          pathRelative = fspath.relative(this.cfg.rootDir, file);
          if (pathRelative.startsWith('node_modules/')) {
            pathRelative = pathRelative.substring('node_modules/'.length);
          }
        }

        const lines = n
          .toString()
          .trim()
          .split('\n')
          .filter((l) => !/^\s*$/.test(l));
        // hack:
        if (lines.length > 1) {
          lines[0] = lines[0].trim();
          lines[lines.length - 1] = lines[lines.length - 1].trim();
        }
        n.selectors
          .filter((s) => s[0] === '.')
          .forEach((s) => {
            const idx = s.indexOf(' ');
            if (idx !== -1) {
              selectors.add({ token: s.substring(1, idx), pathRelative, source: lines.join('\n') });
            } else {
              selectors.add({ token: s.substring(1), pathRelative, source: lines.join('\n') });
            }
          });
      }
    });
    selectors.forEach((s) => {
      trie.wordAdd(s.token, s);
    });
  }

  async updateRoot(path: string) {
    const { rootDir } = this.cfg;
    const trie = new TrieNode<CLSlot>();
    const pathRelative = fspath.relative(rootDir, path);
    const css = await this.fileLoad(path).catch((e) => {
      this.log.warn(`Failed to read: ${path} `, e);
      return undefined;
    });
    if (css == undefined) {
      return;
    }
    return postcss([
      postcssSimpleVars(),
      postcssAtRulesVars(),
      postcssNested(),
      postcssImport({ root: rootDir, load: this.fileLoad.bind(this) }),
    ])
      .process(css, { from: path, parser: postcssSafeParser })
      .then((res) => this.processCSSResult(res, pathRelative, trie))
      .then(() => (this.trie = trie))
      .catch((e) => {
        this.log.warn(`Failed to process: ${path}`, e);
      });
  }

  provideCompletionItems(
    document: LinesTextDocument,
    position: Position,
    _token: CancellationToken,
    _context?: CompletionContext | undefined
  ): ProviderResult<CompletionItem[] | CompletionList> {
    return new Promise(async (resolve) => {
      const results: CompletionItem[] = [];
      if (!(await this.init(document))) {
        return resolve(results);
      }

      const line = document.lineAt(position);
      if (line.isEmptyOrWhitespace) {
        return resolve(results);
      }

      const text = line.text;
      let sidx = position.character - 1;
      for (; sidx >= 0 && /[a-zA-Z0-9-_]/.test(text[sidx]); --sidx);
      ++sidx;

      const word = text.substring(sidx, position.character);
      if (word.length == 0) {
        return resolve(results);
      }

      const attr = (function () {
        let arr: string[] = [];
        for (; sidx >= 0; --sidx) {
          if (text[sidx] === "'" || text[sidx] === '"') {
            --sidx;
            for (; sidx >= 0 && /\s/.test(text[sidx]); --sidx);
            if (sidx > 0 && text[sidx] === '=') {
              --sidx;
              for (; sidx >= 0 && /\s/.test(text[sidx]); --sidx);
              for (; sidx >= 0 && /[a-zA-Z0-9-_]/.test(text[sidx]); --sidx) {
                arr.unshift(text[sidx]);
              }
              break;
            }
          }
        }
        return arr.join('');
      })();

      if (attr === '' || !this.cfg.classAttributes.has(attr)) {
        return resolve(results);
      }

      for (const s of this.trie.prefixFind(word)) {
        results.push({
          label: s.token,
          kind: CompletionItemKind.Variable,
          detail: s.pathRelative,
          documentation: {
            kind: 'markdown',
            value: ['```css', s.source, '```'].join('\n'),
          },
        });
        if (results.length >= this.cfg.maxResults) {
          break;
        }
      }
      return resolve(results);
    });
  }
}
