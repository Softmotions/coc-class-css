import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';

import postcss, { Result } from 'postcss';
import postcssAtRulesVars from 'postcss-at-rules-variables';
import postcssImport from 'postcss-import';
import dataUrl from 'postcss-import/lib/data-url.js';
import loadContent from 'postcss-import/lib/load-content.js';
import postcssNested from 'postcss-nested';
import postcssSafeParser from 'postcss-safe-parser';
import postcssSimpleVars from 'postcss-simple-vars';

if (process.argv.length < 3) {
  console.error('No input file specified');
  process.exit(1);
}

const input = path.resolve(process.argv[2]);
const from = input; //'src/index.css';
const root = dirname(input);

async function processResult(result: Result) {
  const selectors = new Set<string>();
  result.root.walk((n) => {
    if (n.type === 'rule' && n.selector) {
      n.selectors
        .filter((s) => s[0] === '.')
        .forEach((s) => {
          const idx = s.indexOf(' ');
          if (idx !== -1) {
            selectors.add(s.substring(1, idx));
          } else {
            selectors.add(s.substring(1));
          }
        });
    }
  });
}

function load(filename: string, opts: any) {
  // console.log(opts);
  if (!dataUrl.isValid(filename)) {
    console.log('@import ' + filename);
    return loadContent(filename, opts);
  }
}

(async function () {
  const css = (await fs.readFile(input)).toString('utf8');
  postcss([postcssSimpleVars(), postcssAtRulesVars(), postcssNested(), postcssImport({ root, load })])
    .process(css, { from, parser: postcssSafeParser })
    .then((result) => {
      return processResult(result);
    })
    .catch((e) => {
      console.error(e);
    });
})();
