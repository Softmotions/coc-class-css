"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(src_exports);
var import_coc2 = require("coc.nvim");

// src/completion.ts
var import_coc = require("coc.nvim");

// src/constants.ts
var ExtensionName = "coc-class-css";

// src/trie.ts
var TrieNode = class {
  constructor(data) {
    this.children = /* @__PURE__ */ new Map();
    this.data = data;
  }
  wordAdd(word, data) {
    let n = this;
    for (let ch of word) {
      let nn = n.children.get(ch);
      if (nn === void 0) {
        nn = new TrieNode();
        n.children.set(ch, nn);
      }
      n = nn;
    }
    n.data = data;
  }
  wordRemoveImpl(n, word) {
    if (word.length === 0) {
      if (n.data !== void 0) {
        delete n.data;
        return true;
      }
      return false;
    }
    const ch = word[0];
    const nn = n.children.get(ch);
    if (!nn) {
      return false;
    }
    if (!this.wordRemoveImpl(nn, word.substring(1))) {
      return false;
    }
    if (nn.children.size === 0) {
      n.children.delete(ch);
    }
    return true;
  }
  wordRemove(word) {
    return this.wordRemoveImpl(this, word);
  }
  *dataTraverse() {
    if (this.data !== void 0) {
      yield this.data;
    }
    for (const child of this.children.values()) {
      yield* child.dataTraverse();
    }
  }
  *prefixFind(prefix) {
    let n = this;
    for (let ch of prefix) {
      const nn = n.children.get(ch);
      if (!nn) {
        return;
      }
      n = nn;
    }
    yield* n.dataTraverse();
  }
};

// node_modules/find-up/index.js
var import_node_path2 = __toESM(require("node:path"), 1);
var import_node_url2 = require("node:url");

// node_modules/locate-path/index.js
var import_node_process = __toESM(require("node:process"), 1);
var import_node_path = __toESM(require("node:path"), 1);
var import_node_fs = __toESM(require("node:fs"), 1);
var import_node_url = require("node:url");

// node_modules/yocto-queue/index.js
var Node = class {
  value;
  next;
  constructor(value) {
    this.value = value;
  }
};
var Queue = class {
  #head;
  #tail;
  #size;
  constructor() {
    this.clear();
  }
  enqueue(value) {
    const node = new Node(value);
    if (this.#head) {
      this.#tail.next = node;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#size++;
  }
  dequeue() {
    const current = this.#head;
    if (!current) {
      return;
    }
    this.#head = this.#head.next;
    this.#size--;
    return current.value;
  }
  clear() {
    this.#head = void 0;
    this.#tail = void 0;
    this.#size = 0;
  }
  get size() {
    return this.#size;
  }
  *[Symbol.iterator]() {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
};

// node_modules/p-limit/index.js
function pLimit(concurrency) {
  if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) {
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  }
  const queue = new Queue();
  let activeCount = 0;
  const next = () => {
    activeCount--;
    if (queue.size > 0) {
      queue.dequeue()();
    }
  };
  const run = async (fn, resolve, args) => {
    activeCount++;
    const result = (async () => fn(...args))();
    resolve(result);
    try {
      await result;
    } catch {
    }
    next();
  };
  const enqueue = (fn, resolve, args) => {
    queue.enqueue(run.bind(void 0, fn, resolve, args));
    (async () => {
      await Promise.resolve();
      if (activeCount < concurrency && queue.size > 0) {
        queue.dequeue()();
      }
    })();
  };
  const generator = (fn, ...args) => new Promise((resolve) => {
    enqueue(fn, resolve, args);
  });
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.size
    },
    clearQueue: {
      value: () => {
        queue.clear();
      }
    }
  });
  return generator;
}

// node_modules/p-locate/index.js
var EndError = class extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
};
var testElement = async (element, tester) => tester(await element);
var finder = async (element) => {
  const values = await Promise.all(element);
  if (values[1] === true) {
    throw new EndError(values[0]);
  }
  return false;
};
async function pLocate(iterable, tester, {
  concurrency = Number.POSITIVE_INFINITY,
  preserveOrder = true
} = {}) {
  const limit = pLimit(concurrency);
  const items = [...iterable].map((element) => [element, limit(testElement, element, tester)]);
  const checkLimit = pLimit(preserveOrder ? 1 : Number.POSITIVE_INFINITY);
  try {
    await Promise.all(items.map((element) => checkLimit(finder, element)));
  } catch (error) {
    if (error instanceof EndError) {
      return error.value;
    }
    throw error;
  }
}

// node_modules/locate-path/index.js
var typeMappings = {
  directory: "isDirectory",
  file: "isFile"
};
function checkType(type) {
  if (Object.hasOwnProperty.call(typeMappings, type)) {
    return;
  }
  throw new Error(`Invalid type specified: ${type}`);
}
var matchType = (type, stat) => stat[typeMappings[type]]();
var toPath = (urlOrPath) => urlOrPath instanceof URL ? (0, import_node_url.fileURLToPath)(urlOrPath) : urlOrPath;
async function locatePath(paths, {
  cwd = import_node_process.default.cwd(),
  type = "file",
  allowSymlinks = true,
  concurrency,
  preserveOrder
} = {}) {
  checkType(type);
  cwd = toPath(cwd);
  const statFunction = allowSymlinks ? import_node_fs.promises.stat : import_node_fs.promises.lstat;
  return pLocate(paths, async (path_) => {
    try {
      const stat = await statFunction(import_node_path.default.resolve(cwd, path_));
      return matchType(type, stat);
    } catch {
      return false;
    }
  }, { concurrency, preserveOrder });
}

// node_modules/find-up/index.js
var toPath2 = (urlOrPath) => urlOrPath instanceof URL ? (0, import_node_url2.fileURLToPath)(urlOrPath) : urlOrPath;
var findUpStop = Symbol("findUpStop");
async function findUpMultiple(name, options = {}) {
  let directory = import_node_path2.default.resolve(toPath2(options.cwd) || "");
  const { root } = import_node_path2.default.parse(directory);
  const stopAt = import_node_path2.default.resolve(directory, options.stopAt || root);
  const limit = options.limit || Number.POSITIVE_INFINITY;
  const paths = [name].flat();
  const runMatcher = async (locateOptions) => {
    if (typeof name !== "function") {
      return locatePath(paths, locateOptions);
    }
    const foundPath = await name(locateOptions.cwd);
    if (typeof foundPath === "string") {
      return locatePath([foundPath], locateOptions);
    }
    return foundPath;
  };
  const matches = [];
  while (true) {
    const foundPath = await runMatcher({ ...options, cwd: directory });
    if (foundPath === findUpStop) {
      break;
    }
    if (foundPath) {
      matches.push(import_node_path2.default.resolve(directory, foundPath));
    }
    if (directory === stopAt || matches.length >= limit) {
      break;
    }
    directory = import_node_path2.default.dirname(directory);
  }
  return matches;
}
async function findUp(name, options = {}) {
  const matches = await findUpMultiple(name, { ...options, limit: 1 });
  return matches[0];
}

// src/completion.ts
var import_fs = __toESM(require("fs"));
var import_promises = require("node:fs/promises");
var import_node_path3 = __toESM(require("node:path"));
var CSSClassCompletionProvider = class {
  constructor(context) {
    this.trie = new TrieNode();
    this.watched = /* @__PURE__ */ new Map();
    this.context = context;
    this.log = context.logger;
    context.workspaceState;
  }
  dispose() {
  }
  async init(doc) {
    if (this.rootDir) {
      return true;
    }
    const uri = import_coc.Uri.parse(doc.uri);
    if (!import_coc.workspace.root || uri.scheme !== "file") {
      return false;
    }
    const cwd = (0, import_node_path3.dirname)(uri.fsPath);
    this.rootDir = await findUp("package.json", {
      stopAt: import_coc.workspace.root,
      cwd
    });
    if (this.rootDir) {
      this.rootDir = import_node_path3.default.dirname(this.rootDir);
    }
    this.rootDir = import_node_path3.default.resolve(this.rootDir || import_coc.workspace.root);
    const roots = import_coc.workspace.getConfiguration(ExtensionName, doc.uri.toString()).get("cssRoots", ["index.css"]);
    await this.updateUnresolvedFiles(roots);
    return true;
  }
  resolvePath(p) {
    if (!this.rootDir) {
      return void 0;
    }
    if (!import_node_path3.default.isAbsolute(p)) {
      p = import_node_path3.default.join(this.rootDir, p);
    }
    let result = import_node_path3.default.relative(this.rootDir, p);
    if (result != "") {
      p = result;
    }
    if (import_node_path3.default.isAbsolute(p)) {
      return void 0;
    }
    return p;
  }
  async resolveFiles(paths) {
    return Promise.all(
      paths.map((v) => this.resolvePath(v)).filter((v) => v !== void 0).map(
        async (v) => (0, import_promises.access)(import_node_path3.default.join(this.rootDir, v), import_fs.default.constants.R_OK).then(() => v).catch(() => void 0)
      )
    ).then((v) => v.filter((v2) => v2 !== void 0));
  }
  async updateUnresolvedFiles(paths) {
    return this.updateResolvedFiles(await this.resolveFiles(paths));
  }
  async updateResolvedFiles(paths) {
    this.log.info("Update resolved ", paths);
  }
  provideCompletionItems(document, position, token, context) {
    return new Promise(async (resolve) => {
      await this.init(document);
      const line = document.lineAt(position);
      if (line.isEmptyOrWhitespace) {
        return resolve([]);
      }
      const text = line.text;
      let sidx = position.character - 1;
      for (; sidx >= 0 && /[a-zA-Z0-9-_]/.test(text[sidx]); --sidx)
        ;
      ++sidx;
      const word = text.substring(sidx, position.character);
      if (word.length == 0) {
        return resolve([]);
      }
      resolve([]);
    });
  }
};

// src/index.ts
async function activate(context) {
  const cfg = import_coc2.workspace.getConfiguration(ExtensionName);
  if (cfg.get("enabled", false) === false) {
    return;
  }
  const enabledLanguages = cfg.get("languages", ["html"]);
  context.logger.info(`Activating ${ExtensionName} for ${enabledLanguages.join(",")}`);
  const provider = new CSSClassCompletionProvider(context);
  context.subscriptions.push(
    import_coc2.languages.registerCompletionItemProvider("coc-class-css", "CCC", enabledLanguages, provider),
    provider
  );
}
function deactivate() {
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
