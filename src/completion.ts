import {
  CancellationToken,
  CompletionContext,
  CompletionItem,
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
import { ExtensionName } from './constants';
import { TrieNode } from './trie';

import fs from 'fs';
import { access } from 'node:fs/promises';
import path, { dirname } from 'node:path';

/**
 * CSS class node
 */
interface CLSlot {
  token: string; /// CSS class
  file: string; /// Owner file
}

export class CSSClassCompletionProvider implements CompletionItemProvider, Disposable {
  readonly context: ExtensionContext;

  readonly log: Logger;

  readonly trie = new TrieNode<CLSlot>();

  readonly watched = new Map<string, Disposable>();

  rootDir: string | undefined;

  constructor(context: ExtensionContext) {
    this.context = context;
    this.log = context.logger;
    context.workspaceState;
  }

  dispose() {}

  async init(doc: TextDocument): Promise<boolean> {
    if (this.rootDir) {
      return true;
    }
    const uri = Uri.parse(doc.uri);
    if (!workspace.root || uri.scheme !== 'file') {
      return false;
    }
    const cwd = dirname(uri.fsPath);
    this.rootDir = await findUp('package.json', {
      stopAt: workspace.root,
      cwd,
    });
    if (this.rootDir) {
      this.rootDir = path.dirname(this.rootDir);
    }
    this.rootDir = path.resolve(this.rootDir || workspace.root);
    const roots = workspace
      .getConfiguration(ExtensionName, doc.uri.toString())
      .get<string[]>('cssRoots', ['index.css']);

    await this.updateUnresolvedFiles(roots);

    return true;
  }

  resolvePath(p: string): string | undefined {
    if (!this.rootDir) {
      return undefined;
    }
    if (!path.isAbsolute(p)) {
      p = path.join(this.rootDir, p);
    }
    let result = path.relative(this.rootDir, p);
    if (result != '') {
      p = result;
    }
    if (path.isAbsolute(p)) {
      return undefined;
    }
    return p;
  }

  async resolveFiles(paths: string[]): Promise<string[]> {
    return Promise.all(
      paths
        .map((v) => this.resolvePath(v))
        .filter((v) => v !== undefined)
        .map(async (v) =>
          access(path.join(this.rootDir!, v!), fs.constants.R_OK)
            .then(() => v)
            .catch(() => undefined)
        )
    ).then((v) => v.filter((v) => v !== undefined) as string[]);
  }

  async updateUnresolvedFiles(paths: string[]) {
    return this.updateResolvedFiles(await this.resolveFiles(paths));
  }

  async updateResolvedFiles(paths: string[]) {
    // TODO:
    this.log.info('Update resolved ', paths);
  }

  provideCompletionItems(
    document: LinesTextDocument,
    position: Position,
    token: CancellationToken,
    context?: CompletionContext | undefined
  ): ProviderResult<CompletionItem[] | CompletionList> {
    return new Promise(async (resolve) => {
      if (!(await this.init(document))) {
        return resolve([]);
      }
      const line = document.lineAt(position);
      if (line.isEmptyOrWhitespace) {
        return resolve([]);
      }
      const text = line.text;
      let sidx = position.character - 1;
      for (; sidx >= 0 && /[a-zA-Z0-9-_]/.test(text[sidx]); --sidx);
      ++sidx;
      const word = text.substring(sidx, position.character);
      if (word.length == 0) {
        return resolve([]);
      }

      //workspace.onDidChangeWorkspaceFolders
      //this.log.info('W=\'' + word + '\'');

      return resolve([]);
    });
  }
}
