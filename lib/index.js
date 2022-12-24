"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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

// node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/picocolors/picocolors.js"(exports, module2) {
    var tty = require("tty");
    var isColorSupported = !("NO_COLOR" in process.env || process.argv.includes("--no-color")) && ("FORCE_COLOR" in process.env || process.argv.includes("--color") || process.platform === "win32" || tty.isatty(1) && process.env.TERM !== "dumb" || "CI" in process.env);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input;
      let index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let start = string.substring(0, index) + replace;
      let end = string.substring(index + close.length);
      let nextIndex = end.indexOf(close);
      return ~nextIndex ? start + replaceClose(end, close, replace, nextIndex) : start + end;
    };
    var createColors = (enabled = isColorSupported) => ({
      isColorSupported: enabled,
      reset: enabled ? (s) => `\x1B[0m${s}\x1B[0m` : String,
      bold: enabled ? formatter("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m") : String,
      dim: enabled ? formatter("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m") : String,
      italic: enabled ? formatter("\x1B[3m", "\x1B[23m") : String,
      underline: enabled ? formatter("\x1B[4m", "\x1B[24m") : String,
      inverse: enabled ? formatter("\x1B[7m", "\x1B[27m") : String,
      hidden: enabled ? formatter("\x1B[8m", "\x1B[28m") : String,
      strikethrough: enabled ? formatter("\x1B[9m", "\x1B[29m") : String,
      black: enabled ? formatter("\x1B[30m", "\x1B[39m") : String,
      red: enabled ? formatter("\x1B[31m", "\x1B[39m") : String,
      green: enabled ? formatter("\x1B[32m", "\x1B[39m") : String,
      yellow: enabled ? formatter("\x1B[33m", "\x1B[39m") : String,
      blue: enabled ? formatter("\x1B[34m", "\x1B[39m") : String,
      magenta: enabled ? formatter("\x1B[35m", "\x1B[39m") : String,
      cyan: enabled ? formatter("\x1B[36m", "\x1B[39m") : String,
      white: enabled ? formatter("\x1B[37m", "\x1B[39m") : String,
      gray: enabled ? formatter("\x1B[90m", "\x1B[39m") : String,
      bgBlack: enabled ? formatter("\x1B[40m", "\x1B[49m") : String,
      bgRed: enabled ? formatter("\x1B[41m", "\x1B[49m") : String,
      bgGreen: enabled ? formatter("\x1B[42m", "\x1B[49m") : String,
      bgYellow: enabled ? formatter("\x1B[43m", "\x1B[49m") : String,
      bgBlue: enabled ? formatter("\x1B[44m", "\x1B[49m") : String,
      bgMagenta: enabled ? formatter("\x1B[45m", "\x1B[49m") : String,
      bgCyan: enabled ? formatter("\x1B[46m", "\x1B[49m") : String,
      bgWhite: enabled ? formatter("\x1B[47m", "\x1B[49m") : String
    });
    module2.exports = createColors();
    module2.exports.createColors = createColors;
  }
});

// node_modules/postcss/lib/tokenize.js
var require_tokenize = __commonJS({
  "node_modules/postcss/lib/tokenize.js"(exports, module2) {
    "use strict";
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_SQUARE = "[".charCodeAt(0);
    var CLOSE_SQUARE = "]".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERISK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
    var RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\n"'(/\\]/;
    var RE_HEX_ESCAPE = /[\da-f]/i;
    module2.exports = function tokenizer(input, options = {}) {
      let css = input.css.valueOf();
      let ignore = options.ignoreErrors;
      let code, next, quote, content, escape;
      let escaped, escapePos, prev, n, currentToken;
      let length = css.length;
      let pos = 0;
      let buffer = [];
      let returned = [];
      function position() {
        return pos;
      }
      function unclosed(what) {
        throw input.error("Unclosed " + what, pos);
      }
      function endOfFile() {
        return returned.length === 0 && pos >= length;
      }
      function nextToken(opts) {
        if (returned.length)
          return returned.pop();
        if (pos >= length)
          return;
        let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
        code = css.charCodeAt(pos);
        switch (code) {
          case NEWLINE:
          case SPACE:
          case TAB:
          case CR:
          case FEED: {
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
            currentToken = ["space", css.slice(pos, next)];
            pos = next - 1;
            break;
          }
          case OPEN_SQUARE:
          case CLOSE_SQUARE:
          case OPEN_CURLY:
          case CLOSE_CURLY:
          case COLON:
          case SEMICOLON:
          case CLOSE_PARENTHESES: {
            let controlChar = String.fromCharCode(code);
            currentToken = [controlChar, controlChar, pos];
            break;
          }
          case OPEN_PARENTHESES: {
            prev = buffer.length ? buffer.pop()[1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
              next = pos;
              do {
                escaped = false;
                next = css.indexOf(")", next + 1);
                if (next === -1) {
                  if (ignore || ignoreUnclosed) {
                    next = pos;
                    break;
                  } else {
                    unclosed("bracket");
                  }
                }
                escapePos = next;
                while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                  escapePos -= 1;
                  escaped = !escaped;
                }
              } while (escaped);
              currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                currentToken = ["(", "(", pos];
              } else {
                currentToken = ["brackets", content, pos, next];
                pos = next;
              }
            }
            break;
          }
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE: {
            quote = code === SINGLE_QUOTE ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos + 1;
                  break;
                } else {
                  unclosed("string");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            currentToken = ["string", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case AT: {
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          case BACKSLASH: {
            next = pos;
            escape = true;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape = !escape;
            }
            code = css.charCodeAt(next + 1);
            if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
              next += 1;
              if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                  next += 1;
                }
                if (css.charCodeAt(next + 1) === SPACE) {
                  next += 1;
                }
              }
            }
            currentToken = ["word", css.slice(pos, next + 1), pos, next];
            pos = next;
            break;
          }
          default: {
            if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                if (ignore || ignoreUnclosed) {
                  next = css.length;
                } else {
                  unclosed("comment");
                }
              }
              currentToken = ["comment", css.slice(pos, next + 1), pos, next];
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              currentToken = ["word", css.slice(pos, next + 1), pos, next];
              buffer.push(currentToken);
              pos = next;
            }
            break;
          }
        }
        pos++;
        return currentToken;
      }
      function back(token) {
        returned.push(token);
      }
      return {
        back,
        nextToken,
        endOfFile,
        position
      };
    };
  }
});

// node_modules/postcss/lib/terminal-highlight.js
var require_terminal_highlight = __commonJS({
  "node_modules/postcss/lib/terminal-highlight.js"(exports, module2) {
    "use strict";
    var pico = require_picocolors();
    var tokenizer = require_tokenize();
    var Input2;
    function registerInput(dependant) {
      Input2 = dependant;
    }
    var HIGHLIGHT_THEME = {
      "brackets": pico.cyan,
      "at-word": pico.cyan,
      "comment": pico.gray,
      "string": pico.green,
      "class": pico.yellow,
      "hash": pico.magenta,
      "call": pico.cyan,
      "(": pico.cyan,
      ")": pico.cyan,
      "{": pico.yellow,
      "}": pico.yellow,
      "[": pico.yellow,
      "]": pico.yellow,
      ":": pico.yellow,
      ";": pico.yellow
    };
    function getTokenType([type, value], processor) {
      if (type === "word") {
        if (value[0] === ".") {
          return "class";
        }
        if (value[0] === "#") {
          return "hash";
        }
      }
      if (!processor.endOfFile()) {
        let next = processor.nextToken();
        processor.back(next);
        if (next[0] === "brackets" || next[0] === "(")
          return "call";
      }
      return type;
    }
    function terminalHighlight(css) {
      let processor = tokenizer(new Input2(css), { ignoreErrors: true });
      let result = "";
      while (!processor.endOfFile()) {
        let token = processor.nextToken();
        let color = HIGHLIGHT_THEME[getTokenType(token, processor)];
        if (color) {
          result += token[1].split(/\r?\n/).map((i) => color(i)).join("\n");
        } else {
          result += token[1];
        }
      }
      return result;
    }
    terminalHighlight.registerInput = registerInput;
    module2.exports = terminalHighlight;
  }
});

// node_modules/postcss/lib/css-syntax-error.js
var require_css_syntax_error = __commonJS({
  "node_modules/postcss/lib/css-syntax-error.js"(exports, module2) {
    "use strict";
    var pico = require_picocolors();
    var terminalHighlight = require_terminal_highlight();
    var CssSyntaxError2 = class extends Error {
      constructor(message, line, column, source, file, plugin2) {
        super(message);
        this.name = "CssSyntaxError";
        this.reason = message;
        if (file) {
          this.file = file;
        }
        if (source) {
          this.source = source;
        }
        if (plugin2) {
          this.plugin = plugin2;
        }
        if (typeof line !== "undefined" && typeof column !== "undefined") {
          if (typeof line === "number") {
            this.line = line;
            this.column = column;
          } else {
            this.line = line.line;
            this.column = line.column;
            this.endLine = column.line;
            this.endColumn = column.column;
          }
        }
        this.setMessage();
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, CssSyntaxError2);
        }
      }
      setMessage() {
        this.message = this.plugin ? this.plugin + ": " : "";
        this.message += this.file ? this.file : "<css input>";
        if (typeof this.line !== "undefined") {
          this.message += ":" + this.line + ":" + this.column;
        }
        this.message += ": " + this.reason;
      }
      showSourceCode(color) {
        if (!this.source)
          return "";
        let css = this.source;
        if (color == null)
          color = pico.isColorSupported;
        if (terminalHighlight) {
          if (color)
            css = terminalHighlight(css);
        }
        let lines = css.split(/\r?\n/);
        let start = Math.max(this.line - 3, 0);
        let end = Math.min(this.line + 2, lines.length);
        let maxWidth = String(end).length;
        let mark, aside;
        if (color) {
          let { bold, red, gray } = pico.createColors(true);
          mark = (text) => bold(red(text));
          aside = (text) => gray(text);
        } else {
          mark = aside = (str) => str;
        }
        return lines.slice(start, end).map((line, index) => {
          let number = start + 1 + index;
          let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
          if (number === this.line) {
            let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
            return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
          }
          return " " + aside(gutter) + line;
        }).join("\n");
      }
      toString() {
        let code = this.showSourceCode();
        if (code) {
          code = "\n\n" + code + "\n";
        }
        return this.name + ": " + this.message + code;
      }
    };
    module2.exports = CssSyntaxError2;
    CssSyntaxError2.default = CssSyntaxError2;
  }
});

// node_modules/postcss/lib/symbols.js
var require_symbols = __commonJS({
  "node_modules/postcss/lib/symbols.js"(exports, module2) {
    "use strict";
    module2.exports.isClean = Symbol("isClean");
    module2.exports.my = Symbol("my");
  }
});

// node_modules/postcss/lib/stringifier.js
var require_stringifier = __commonJS({
  "node_modules/postcss/lib/stringifier.js"(exports, module2) {
    "use strict";
    var DEFAULT_RAW = {
      colon: ": ",
      indent: "    ",
      beforeDecl: "\n",
      beforeRule: "\n",
      beforeOpen: " ",
      beforeClose: "\n",
      beforeComment: "\n",
      after: "\n",
      emptyBody: "",
      commentLeft: " ",
      commentRight: " ",
      semicolon: false
    };
    function capitalize(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
    var Stringifier = class {
      constructor(builder) {
        this.builder = builder;
      }
      stringify(node, semicolon) {
        if (!this[node.type]) {
          throw new Error(
            "Unknown AST node type " + node.type + ". Maybe you need to change PostCSS stringifier."
          );
        }
        this[node.type](node, semicolon);
      }
      document(node) {
        this.body(node);
      }
      root(node) {
        this.body(node);
        if (node.raws.after)
          this.builder(node.raws.after);
      }
      comment(node) {
        let left = this.raw(node, "left", "commentLeft");
        let right = this.raw(node, "right", "commentRight");
        this.builder("/*" + left + node.text + right + "*/", node);
      }
      decl(node, semicolon) {
        let between = this.raw(node, "between", "colon");
        let string = node.prop + between + this.rawValue(node, "value");
        if (node.important) {
          string += node.raws.important || " !important";
        }
        if (semicolon)
          string += ";";
        this.builder(string, node);
      }
      rule(node) {
        this.block(node, this.rawValue(node, "selector"));
        if (node.raws.ownSemicolon) {
          this.builder(node.raws.ownSemicolon, node, "end");
        }
      }
      atrule(node, semicolon) {
        let name = "@" + node.name;
        let params = node.params ? this.rawValue(node, "params") : "";
        if (typeof node.raws.afterName !== "undefined") {
          name += node.raws.afterName;
        } else if (params) {
          name += " ";
        }
        if (node.nodes) {
          this.block(node, name + params);
        } else {
          let end = (node.raws.between || "") + (semicolon ? ";" : "");
          this.builder(name + params + end, node);
        }
      }
      body(node) {
        let last = node.nodes.length - 1;
        while (last > 0) {
          if (node.nodes[last].type !== "comment")
            break;
          last -= 1;
        }
        let semicolon = this.raw(node, "semicolon");
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          let before = this.raw(child, "before");
          if (before)
            this.builder(before);
          this.stringify(child, last !== i || semicolon);
        }
      }
      block(node, start) {
        let between = this.raw(node, "between", "beforeOpen");
        this.builder(start + between + "{", node, "start");
        let after;
        if (node.nodes && node.nodes.length) {
          this.body(node);
          after = this.raw(node, "after");
        } else {
          after = this.raw(node, "after", "emptyBody");
        }
        if (after)
          this.builder(after);
        this.builder("}", node, "end");
      }
      raw(node, own, detect) {
        let value;
        if (!detect)
          detect = own;
        if (own) {
          value = node.raws[own];
          if (typeof value !== "undefined")
            return value;
        }
        let parent = node.parent;
        if (detect === "before") {
          if (!parent || parent.type === "root" && parent.first === node) {
            return "";
          }
          if (parent && parent.type === "document") {
            return "";
          }
        }
        if (!parent)
          return DEFAULT_RAW[detect];
        let root2 = node.root();
        if (!root2.rawCache)
          root2.rawCache = {};
        if (typeof root2.rawCache[detect] !== "undefined") {
          return root2.rawCache[detect];
        }
        if (detect === "before" || detect === "after") {
          return this.beforeAfter(node, detect);
        } else {
          let method = "raw" + capitalize(detect);
          if (this[method]) {
            value = this[method](root2, node);
          } else {
            root2.walk((i) => {
              value = i.raws[own];
              if (typeof value !== "undefined")
                return false;
            });
          }
        }
        if (typeof value === "undefined")
          value = DEFAULT_RAW[detect];
        root2.rawCache[detect] = value;
        return value;
      }
      rawSemicolon(root2) {
        let value;
        root2.walk((i) => {
          if (i.nodes && i.nodes.length && i.last.type === "decl") {
            value = i.raws.semicolon;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      }
      rawEmptyBody(root2) {
        let value;
        root2.walk((i) => {
          if (i.nodes && i.nodes.length === 0) {
            value = i.raws.after;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      }
      rawIndent(root2) {
        if (root2.raws.indent)
          return root2.raws.indent;
        let value;
        root2.walk((i) => {
          let p = i.parent;
          if (p && p !== root2 && p.parent && p.parent === root2) {
            if (typeof i.raws.before !== "undefined") {
              let parts = i.raws.before.split("\n");
              value = parts[parts.length - 1];
              value = value.replace(/\S/g, "");
              return false;
            }
          }
        });
        return value;
      }
      rawBeforeComment(root2, node) {
        let value;
        root2.walkComments((i) => {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value === "undefined") {
          value = this.raw(node, null, "beforeDecl");
        } else if (value) {
          value = value.replace(/\S/g, "");
        }
        return value;
      }
      rawBeforeDecl(root2, node) {
        let value;
        root2.walkDecls((i) => {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.includes("\n")) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value === "undefined") {
          value = this.raw(node, null, "beforeRule");
        } else if (value) {
          value = value.replace(/\S/g, "");
        }
        return value;
      }
      rawBeforeRule(root2) {
        let value;
        root2.walk((i) => {
          if (i.nodes && (i.parent !== root2 || root2.first !== i)) {
            if (typeof i.raws.before !== "undefined") {
              value = i.raws.before;
              if (value.includes("\n")) {
                value = value.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value)
          value = value.replace(/\S/g, "");
        return value;
      }
      rawBeforeClose(root2) {
        let value;
        root2.walk((i) => {
          if (i.nodes && i.nodes.length > 0) {
            if (typeof i.raws.after !== "undefined") {
              value = i.raws.after;
              if (value.includes("\n")) {
                value = value.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value)
          value = value.replace(/\S/g, "");
        return value;
      }
      rawBeforeOpen(root2) {
        let value;
        root2.walk((i) => {
          if (i.type !== "decl") {
            value = i.raws.between;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      }
      rawColon(root2) {
        let value;
        root2.walkDecls((i) => {
          if (typeof i.raws.between !== "undefined") {
            value = i.raws.between.replace(/[^\s:]/g, "");
            return false;
          }
        });
        return value;
      }
      beforeAfter(node, detect) {
        let value;
        if (node.type === "decl") {
          value = this.raw(node, null, "beforeDecl");
        } else if (node.type === "comment") {
          value = this.raw(node, null, "beforeComment");
        } else if (detect === "before") {
          value = this.raw(node, null, "beforeRule");
        } else {
          value = this.raw(node, null, "beforeClose");
        }
        let buf = node.parent;
        let depth = 0;
        while (buf && buf.type !== "root") {
          depth += 1;
          buf = buf.parent;
        }
        if (value.includes("\n")) {
          let indent = this.raw(node, null, "indent");
          if (indent.length) {
            for (let step = 0; step < depth; step++)
              value += indent;
          }
        }
        return value;
      }
      rawValue(node, prop) {
        let value = node[prop];
        let raw = node.raws[prop];
        if (raw && raw.value === value) {
          return raw.raw;
        }
        return value;
      }
    };
    module2.exports = Stringifier;
    Stringifier.default = Stringifier;
  }
});

// node_modules/postcss/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/postcss/lib/stringify.js"(exports, module2) {
    "use strict";
    var Stringifier = require_stringifier();
    function stringify2(node, builder) {
      let str = new Stringifier(builder);
      str.stringify(node);
    }
    module2.exports = stringify2;
    stringify2.default = stringify2;
  }
});

// node_modules/postcss/lib/node.js
var require_node = __commonJS({
  "node_modules/postcss/lib/node.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var CssSyntaxError2 = require_css_syntax_error();
    var Stringifier = require_stringifier();
    var stringify2 = require_stringify();
    function cloneNode(obj, parent) {
      let cloned = new obj.constructor();
      for (let i in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, i)) {
          continue;
        }
        if (i === "proxyCache")
          continue;
        let value = obj[i];
        let type = typeof value;
        if (i === "parent" && type === "object") {
          if (parent)
            cloned[i] = parent;
        } else if (i === "source") {
          cloned[i] = value;
        } else if (Array.isArray(value)) {
          cloned[i] = value.map((j) => cloneNode(j, cloned));
        } else {
          if (type === "object" && value !== null)
            value = cloneNode(value);
          cloned[i] = value;
        }
      }
      return cloned;
    }
    var Node3 = class {
      constructor(defaults = {}) {
        this.raws = {};
        this[isClean] = false;
        this[my] = true;
        for (let name in defaults) {
          if (name === "nodes") {
            this.nodes = [];
            for (let node of defaults[name]) {
              if (typeof node.clone === "function") {
                this.append(node.clone());
              } else {
                this.append(node);
              }
            }
          } else {
            this[name] = defaults[name];
          }
        }
      }
      error(message, opts = {}) {
        if (this.source) {
          let { start, end } = this.rangeBy(opts);
          return this.source.input.error(
            message,
            { line: start.line, column: start.column },
            { line: end.line, column: end.column },
            opts
          );
        }
        return new CssSyntaxError2(message);
      }
      warn(result, text, opts) {
        let data = { node: this };
        for (let i in opts)
          data[i] = opts[i];
        return result.warn(text, data);
      }
      remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      }
      toString(stringifier = stringify2) {
        if (stringifier.stringify)
          stringifier = stringifier.stringify;
        let result = "";
        stringifier(this, (i) => {
          result += i;
        });
        return result;
      }
      assign(overrides = {}) {
        for (let name in overrides) {
          this[name] = overrides[name];
        }
        return this;
      }
      clone(overrides = {}) {
        let cloned = cloneNode(this);
        for (let name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      }
      cloneBefore(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
      }
      cloneAfter(overrides = {}) {
        let cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
      }
      replaceWith(...nodes) {
        if (this.parent) {
          let bookmark = this;
          let foundSelf = false;
          for (let node of nodes) {
            if (node === this) {
              foundSelf = true;
            } else if (foundSelf) {
              this.parent.insertAfter(bookmark, node);
              bookmark = node;
            } else {
              this.parent.insertBefore(bookmark, node);
            }
          }
          if (!foundSelf) {
            this.remove();
          }
        }
        return this;
      }
      next() {
        if (!this.parent)
          return void 0;
        let index = this.parent.index(this);
        return this.parent.nodes[index + 1];
      }
      prev() {
        if (!this.parent)
          return void 0;
        let index = this.parent.index(this);
        return this.parent.nodes[index - 1];
      }
      before(add) {
        this.parent.insertBefore(this, add);
        return this;
      }
      after(add) {
        this.parent.insertAfter(this, add);
        return this;
      }
      root() {
        let result = this;
        while (result.parent && result.parent.type !== "document") {
          result = result.parent;
        }
        return result;
      }
      raw(prop, defaultType) {
        let str = new Stringifier();
        return str.raw(this, prop, defaultType);
      }
      cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween)
          delete this.raws.between;
      }
      toJSON(_, inputs) {
        let fixed = {};
        let emitInputs = inputs == null;
        inputs = inputs || /* @__PURE__ */ new Map();
        let inputsNextIndex = 0;
        for (let name in this) {
          if (!Object.prototype.hasOwnProperty.call(this, name)) {
            continue;
          }
          if (name === "parent" || name === "proxyCache")
            continue;
          let value = this[name];
          if (Array.isArray(value)) {
            fixed[name] = value.map((i) => {
              if (typeof i === "object" && i.toJSON) {
                return i.toJSON(null, inputs);
              } else {
                return i;
              }
            });
          } else if (typeof value === "object" && value.toJSON) {
            fixed[name] = value.toJSON(null, inputs);
          } else if (name === "source") {
            let inputId = inputs.get(value.input);
            if (inputId == null) {
              inputId = inputsNextIndex;
              inputs.set(value.input, inputsNextIndex);
              inputsNextIndex++;
            }
            fixed[name] = {
              inputId,
              start: value.start,
              end: value.end
            };
          } else {
            fixed[name] = value;
          }
        }
        if (emitInputs) {
          fixed.inputs = [...inputs.keys()].map((input) => input.toJSON());
        }
        return fixed;
      }
      positionInside(index) {
        let string = this.toString();
        let column = this.source.start.column;
        let line = this.source.start.line;
        for (let i = 0; i < index; i++) {
          if (string[i] === "\n") {
            column = 1;
            line += 1;
          } else {
            column += 1;
          }
        }
        return { line, column };
      }
      positionBy(opts) {
        let pos = this.source.start;
        if (opts.index) {
          pos = this.positionInside(opts.index);
        } else if (opts.word) {
          let index = this.toString().indexOf(opts.word);
          if (index !== -1)
            pos = this.positionInside(index);
        }
        return pos;
      }
      rangeBy(opts) {
        let start = {
          line: this.source.start.line,
          column: this.source.start.column
        };
        let end = this.source.end ? {
          line: this.source.end.line,
          column: this.source.end.column + 1
        } : {
          line: start.line,
          column: start.column + 1
        };
        if (opts.word) {
          let index = this.toString().indexOf(opts.word);
          if (index !== -1) {
            start = this.positionInside(index);
            end = this.positionInside(index + opts.word.length);
          }
        } else {
          if (opts.start) {
            start = {
              line: opts.start.line,
              column: opts.start.column
            };
          } else if (opts.index) {
            start = this.positionInside(opts.index);
          }
          if (opts.end) {
            end = {
              line: opts.end.line,
              column: opts.end.column
            };
          } else if (opts.endIndex) {
            end = this.positionInside(opts.endIndex);
          } else if (opts.index) {
            end = this.positionInside(opts.index + 1);
          }
        }
        if (end.line < start.line || end.line === start.line && end.column <= start.column) {
          end = { line: start.line, column: start.column + 1 };
        }
        return { start, end };
      }
      getProxyProcessor() {
        return {
          set(node, prop, value) {
            if (node[prop] === value)
              return true;
            node[prop] = value;
            if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || prop === "text") {
              node.markDirty();
            }
            return true;
          },
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else {
              return node[prop];
            }
          }
        };
      }
      toProxy() {
        if (!this.proxyCache) {
          this.proxyCache = new Proxy(this, this.getProxyProcessor());
        }
        return this.proxyCache;
      }
      addToError(error) {
        error.postcssNode = this;
        if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
          let s = this.source;
          error.stack = error.stack.replace(
            /\n\s{4}at /,
            `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
          );
        }
        return error;
      }
      markDirty() {
        if (this[isClean]) {
          this[isClean] = false;
          let next = this;
          while (next = next.parent) {
            next[isClean] = false;
          }
        }
      }
      get proxyOf() {
        return this;
      }
    };
    module2.exports = Node3;
    Node3.default = Node3;
  }
});

// node_modules/postcss/lib/declaration.js
var require_declaration = __commonJS({
  "node_modules/postcss/lib/declaration.js"(exports, module2) {
    "use strict";
    var Node3 = require_node();
    var Declaration2 = class extends Node3 {
      constructor(defaults) {
        if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
          defaults = { ...defaults, value: String(defaults.value) };
        }
        super(defaults);
        this.type = "decl";
      }
      get variable() {
        return this.prop.startsWith("--") || this.prop[0] === "$";
      }
    };
    module2.exports = Declaration2;
    Declaration2.default = Declaration2;
  }
});

// node_modules/source-map-js/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/source-map-js/lib/base64.js"(exports) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "node_modules/source-map-js/lib/base64-vlq.js"(exports) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };
  }
});

// node_modules/source-map-js/lib/util.js
var require_util = __commonJS({
  "node_modules/source-map-js/lib/util.js"(exports) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports.urlGenerate = urlGenerate;
    var MAX_CACHED_INPUTS = 32;
    function lruMemoize(f) {
      var cache = [];
      return function(input) {
        for (var i = 0; i < cache.length; i++) {
          if (cache[i].input === input) {
            var temp = cache[0];
            cache[0] = cache[i];
            cache[i] = temp;
            return cache[0].result;
          }
        }
        var result = f(input);
        cache.unshift({
          input,
          result
        });
        if (cache.length > MAX_CACHED_INPUTS) {
          cache.pop();
        }
        return result;
      };
    }
    var normalize = lruMemoize(function normalize2(aPath) {
      var path3 = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path3 = url.path;
      }
      var isAbsolute = exports.isAbsolute(path3);
      var parts = [];
      var start = 0;
      var i = 0;
      while (true) {
        start = i;
        i = path3.indexOf("/", start);
        if (i === -1) {
          parts.push(path3.slice(start));
          break;
        } else {
          parts.push(path3.slice(start, i));
          while (i < path3.length && path3[i] === "/") {
            i++;
          }
        }
      }
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path3 = parts.join("/");
      if (path3 === "") {
        path3 = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path3;
        return urlGenerate(url);
      }
      return path3;
    });
    exports.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports.join = join;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports.relative = relative;
    var supportsNullProto = function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    }();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;
    function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
      var cmp;
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    exports.computeSourceURL = computeSourceURL;
  }
});

// node_modules/source-map-js/lib/array-set.js
var require_array_set = __commonJS({
  "node_modules/source-map-js/lib/array-set.js"(exports) {
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports.ArraySet = ArraySet;
  }
});

// node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "node_modules/source-map-js/lib/mapping-list.js"(exports) {
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    exports.MappingList = MappingList;
  }
});

// node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "node_modules/source-map-js/lib/source-map-generator.js"(exports) {
    var base64VLQ = require_base64_vlq();
    var util = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    exports.SourceMapGenerator = SourceMapGenerator;
  }
});

// node_modules/source-map-js/lib/binary-search.js
var require_binary_search = __commonJS({
  "node_modules/source-map-js/lib/binary-search.js"(exports) {
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  }
});

// node_modules/source-map-js/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "node_modules/source-map-js/lib/quick-sort.js"(exports) {
    function SortTemplate(comparator) {
      function swap(ary, x, y) {
        var temp = ary[x];
        ary[x] = ary[y];
        ary[y] = temp;
      }
      function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
      }
      function doQuickSort(ary, comparator2, p, r) {
        if (p < r) {
          var pivotIndex = randomIntInRange(p, r);
          var i = p - 1;
          swap(ary, pivotIndex, r);
          var pivot = ary[r];
          for (var j = p; j < r; j++) {
            if (comparator2(ary[j], pivot, false) <= 0) {
              i += 1;
              swap(ary, i, j);
            }
          }
          swap(ary, i + 1, j);
          var q = i + 1;
          doQuickSort(ary, comparator2, p, q - 1);
          doQuickSort(ary, comparator2, q + 1, r);
        }
      }
      return doQuickSort;
    }
    function cloneSort(comparator) {
      let template = SortTemplate.toString();
      let templateFn = new Function(`return ${template}`)();
      return templateFn(comparator);
    }
    var sortCache = /* @__PURE__ */ new WeakMap();
    exports.quickSort = function(ary, comparator, start = 0) {
      let doQuickSort = sortCache.get(comparator);
      if (doQuickSort === void 0) {
        doQuickSort = cloneSort(comparator);
        sortCache.set(comparator, doQuickSort);
      }
      doQuickSort(ary, comparator, start, ary.length - 1);
    };
  }
});

// node_modules/source-map-js/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "node_modules/source-map-js/lib/source-map-consumer.js"(exports) {
    var util = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      var boundCallback = aCallback.bind(context);
      var names = this._names;
      var sources = this._sources;
      var sourceMapURL = this._sourceMapURL;
      for (var i = 0, n = mappings.length; i < n; i++) {
        var mapping = mappings[i];
        var source = mapping.source === null ? null : sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
        boundCallback({
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : names.at(mapping.name)
        });
      }
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings = [];
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        binarySearch.LEAST_UPPER_BOUND
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    };
    exports.SourceMapConsumer = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(
        smc._sources.toArray(),
        smc.sourceRoot
      );
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    var compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
    function sortGenerated(array, start) {
      let l = array.length;
      let n = array.length - start;
      if (n <= 1) {
        return;
      } else if (n == 2) {
        let a = array[start];
        let b = array[start + 1];
        if (compareGenerated(a, b) > 0) {
          array[start] = b;
          array[start + 1] = a;
        }
      } else if (n < 20) {
        for (let i = start; i < l; i++) {
          for (let j = i; j > start; j--) {
            let a = array[j - 1];
            let b = array[j];
            if (compareGenerated(a, b) <= 0) {
              break;
            }
            array[j - 1] = b;
            array[j] = a;
          }
        }
      } else {
        quickSort(array, compareGenerated, start);
      }
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      let subarrayStart = 0;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
          sortGenerated(generatedMappings, subarrayStart);
          subarrayStart = generatedMappings.length;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }
          if (segment.length === 2) {
            throw new Error("Found a source, but no line and column");
          }
          if (segment.length === 3) {
            throw new Error("Found a source and line, but no column");
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            let currentSource = mapping.source;
            while (originalMappings.length <= currentSource) {
              originalMappings.push(null);
            }
            if (originalMappings[currentSource] === null) {
              originalMappings[currentSource] = [];
            }
            originalMappings[currentSource].push(mapping);
          }
        }
      }
      sortGenerated(generatedMappings, subarrayStart);
      this.__generatedMappings = generatedMappings;
      for (var i = 0; i < originalMappings.length; i++) {
        if (originalMappings[i] != null) {
          quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
        }
      }
      this.__originalMappings = [].concat(...originalMappings);
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
        };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(
        needle,
        this._sections,
        function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        }
      );
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };
    exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// node_modules/source-map-js/lib/source-node.js
var require_source_node = __commonJS({
  "node_modules/source-map-js/lib/source-node.js"(exports) {
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    var util = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null)
        this.add(aChunks);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(
            mapping.originalLine,
            mapping.originalColumn,
            source,
            code,
            mapping.name
          ));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    };
    exports.SourceNode = SourceNode;
  }
});

// node_modules/source-map-js/source-map.js
var require_source_map = __commonJS({
  "node_modules/source-map-js/source-map.js"(exports) {
    exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports.SourceNode = require_source_node().SourceNode;
  }
});

// node_modules/nanoid/non-secure/index.cjs
var require_non_secure = __commonJS({
  "node_modules/nanoid/non-secure/index.cjs"(exports, module2) {
    var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    var customAlphabet = (alphabet, defaultSize = 21) => {
      return (size = defaultSize) => {
        let id = "";
        let i = size;
        while (i--) {
          id += alphabet[Math.random() * alphabet.length | 0];
        }
        return id;
      };
    };
    var nanoid = (size = 21) => {
      let id = "";
      let i = size;
      while (i--) {
        id += urlAlphabet[Math.random() * 64 | 0];
      }
      return id;
    };
    module2.exports = { nanoid, customAlphabet };
  }
});

// node_modules/postcss/lib/previous-map.js
var require_previous_map = __commonJS({
  "node_modules/postcss/lib/previous-map.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { existsSync, readFileSync } = require("fs");
    var { dirname: dirname2, join } = require("path");
    function fromBase64(str) {
      if (Buffer) {
        return Buffer.from(str, "base64").toString();
      } else {
        return window.atob(str);
      }
    }
    var PreviousMap = class {
      constructor(css, opts) {
        if (opts.map === false)
          return;
        this.loadAnnotation(css);
        this.inline = this.startWith(this.annotation, "data:");
        let prev = opts.map ? opts.map.prev : void 0;
        let text = this.loadMap(opts.from, prev);
        if (!this.mapFile && opts.from) {
          this.mapFile = opts.from;
        }
        if (this.mapFile)
          this.root = dirname2(this.mapFile);
        if (text)
          this.text = text;
      }
      consumer() {
        if (!this.consumerCache) {
          this.consumerCache = new SourceMapConsumer(this.text);
        }
        return this.consumerCache;
      }
      withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
      }
      startWith(string, start) {
        if (!string)
          return false;
        return string.substr(0, start.length) === start;
      }
      getAnnotationURL(sourceMapString) {
        return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
      }
      loadAnnotation(css) {
        let comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
        if (!comments)
          return;
        let start = css.lastIndexOf(comments.pop());
        let end = css.indexOf("*/", start);
        if (start > -1 && end > -1) {
          this.annotation = this.getAnnotationURL(css.substring(start, end));
        }
      }
      decodeInline(text) {
        let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
        let baseUri = /^data:application\/json;base64,/;
        let charsetUri = /^data:application\/json;charset=utf-?8,/;
        let uri = /^data:application\/json,/;
        if (charsetUri.test(text) || uri.test(text)) {
          return decodeURIComponent(text.substr(RegExp.lastMatch.length));
        }
        if (baseCharsetUri.test(text) || baseUri.test(text)) {
          return fromBase64(text.substr(RegExp.lastMatch.length));
        }
        let encoding = text.match(/data:application\/json;([^,]+),/)[1];
        throw new Error("Unsupported source map encoding " + encoding);
      }
      loadFile(path3) {
        this.root = dirname2(path3);
        if (existsSync(path3)) {
          this.mapFile = path3;
          return readFileSync(path3, "utf-8").toString().trim();
        }
      }
      loadMap(file, prev) {
        if (prev === false)
          return false;
        if (prev) {
          if (typeof prev === "string") {
            return prev;
          } else if (typeof prev === "function") {
            let prevPath = prev(file);
            if (prevPath) {
              let map = this.loadFile(prevPath);
              if (!map) {
                throw new Error(
                  "Unable to load previous source map: " + prevPath.toString()
                );
              }
              return map;
            }
          } else if (prev instanceof SourceMapConsumer) {
            return SourceMapGenerator.fromSourceMap(prev).toString();
          } else if (prev instanceof SourceMapGenerator) {
            return prev.toString();
          } else if (this.isMap(prev)) {
            return JSON.stringify(prev);
          } else {
            throw new Error(
              "Unsupported previous source map format: " + prev.toString()
            );
          }
        } else if (this.inline) {
          return this.decodeInline(this.annotation);
        } else if (this.annotation) {
          let map = this.annotation;
          if (file)
            map = join(dirname2(file), map);
          return this.loadFile(map);
        }
      }
      isMap(map) {
        if (typeof map !== "object")
          return false;
        return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
      }
    };
    module2.exports = PreviousMap;
    PreviousMap.default = PreviousMap;
  }
});

// node_modules/postcss/lib/input.js
var require_input = __commonJS({
  "node_modules/postcss/lib/input.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { fileURLToPath: fileURLToPath3, pathToFileURL } = require("url");
    var { resolve, isAbsolute } = require("path");
    var { nanoid } = require_non_secure();
    var terminalHighlight = require_terminal_highlight();
    var CssSyntaxError2 = require_css_syntax_error();
    var PreviousMap = require_previous_map();
    var fromOffsetCache = Symbol("fromOffsetCache");
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    var pathAvailable = Boolean(resolve && isAbsolute);
    var Input2 = class {
      constructor(css, opts = {}) {
        if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
          throw new Error(`PostCSS received ${css} instead of CSS string`);
        }
        this.css = css.toString();
        if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
          this.hasBOM = true;
          this.css = this.css.slice(1);
        } else {
          this.hasBOM = false;
        }
        if (opts.from) {
          if (!pathAvailable || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
            this.file = opts.from;
          } else {
            this.file = resolve(opts.from);
          }
        }
        if (pathAvailable && sourceMapAvailable) {
          let map = new PreviousMap(this.css, opts);
          if (map.text) {
            this.map = map;
            let file = map.consumer().file;
            if (!this.file && file)
              this.file = this.mapResolve(file);
          }
        }
        if (!this.file) {
          this.id = "<input css " + nanoid(6) + ">";
        }
        if (this.map)
          this.map.file = this.from;
      }
      fromOffset(offset) {
        let lastLine, lineToIndex;
        if (!this[fromOffsetCache]) {
          let lines = this.css.split("\n");
          lineToIndex = new Array(lines.length);
          let prevIndex = 0;
          for (let i = 0, l = lines.length; i < l; i++) {
            lineToIndex[i] = prevIndex;
            prevIndex += lines[i].length + 1;
          }
          this[fromOffsetCache] = lineToIndex;
        } else {
          lineToIndex = this[fromOffsetCache];
        }
        lastLine = lineToIndex[lineToIndex.length - 1];
        let min = 0;
        if (offset >= lastLine) {
          min = lineToIndex.length - 1;
        } else {
          let max = lineToIndex.length - 2;
          let mid;
          while (min < max) {
            mid = min + (max - min >> 1);
            if (offset < lineToIndex[mid]) {
              max = mid - 1;
            } else if (offset >= lineToIndex[mid + 1]) {
              min = mid + 1;
            } else {
              min = mid;
              break;
            }
          }
        }
        return {
          line: min + 1,
          col: offset - lineToIndex[min] + 1
        };
      }
      error(message, line, column, opts = {}) {
        let result, endLine, endColumn;
        if (line && typeof line === "object") {
          let start = line;
          let end = column;
          if (typeof line.offset === "number") {
            let pos = this.fromOffset(start.offset);
            line = pos.line;
            column = pos.col;
          } else {
            line = start.line;
            column = start.column;
          }
          if (typeof end.offset === "number") {
            let pos = this.fromOffset(end.offset);
            endLine = pos.line;
            endColumn = pos.col;
          } else {
            endLine = end.line;
            endColumn = end.column;
          }
        } else if (!column) {
          let pos = this.fromOffset(line);
          line = pos.line;
          column = pos.col;
        }
        let origin = this.origin(line, column, endLine, endColumn);
        if (origin) {
          result = new CssSyntaxError2(
            message,
            origin.endLine === void 0 ? origin.line : { line: origin.line, column: origin.column },
            origin.endLine === void 0 ? origin.column : { line: origin.endLine, column: origin.endColumn },
            origin.source,
            origin.file,
            opts.plugin
          );
        } else {
          result = new CssSyntaxError2(
            message,
            endLine === void 0 ? line : { line, column },
            endLine === void 0 ? column : { line: endLine, column: endColumn },
            this.css,
            this.file,
            opts.plugin
          );
        }
        result.input = { line, column, endLine, endColumn, source: this.css };
        if (this.file) {
          if (pathToFileURL) {
            result.input.url = pathToFileURL(this.file).toString();
          }
          result.input.file = this.file;
        }
        return result;
      }
      origin(line, column, endLine, endColumn) {
        if (!this.map)
          return false;
        let consumer = this.map.consumer();
        let from = consumer.originalPositionFor({ line, column });
        if (!from.source)
          return false;
        let to;
        if (typeof endLine === "number") {
          to = consumer.originalPositionFor({ line: endLine, column: endColumn });
        }
        let fromUrl;
        if (isAbsolute(from.source)) {
          fromUrl = pathToFileURL(from.source);
        } else {
          fromUrl = new URL(
            from.source,
            this.map.consumer().sourceRoot || pathToFileURL(this.map.mapFile)
          );
        }
        let result = {
          url: fromUrl.toString(),
          line: from.line,
          column: from.column,
          endLine: to && to.line,
          endColumn: to && to.column
        };
        if (fromUrl.protocol === "file:") {
          if (fileURLToPath3) {
            result.file = fileURLToPath3(fromUrl);
          } else {
            throw new Error(`file: protocol is not available in this PostCSS build`);
          }
        }
        let source = consumer.sourceContentFor(from.source);
        if (source)
          result.source = source;
        return result;
      }
      mapResolve(file) {
        if (/^\w+:\/\//.test(file)) {
          return file;
        }
        return resolve(this.map.consumer().sourceRoot || this.map.root || ".", file);
      }
      get from() {
        return this.file || this.id;
      }
      toJSON() {
        let json = {};
        for (let name of ["hasBOM", "css", "file", "id"]) {
          if (this[name] != null) {
            json[name] = this[name];
          }
        }
        if (this.map) {
          json.map = { ...this.map };
          if (json.map.consumerCache) {
            json.map.consumerCache = void 0;
          }
        }
        return json;
      }
    };
    module2.exports = Input2;
    Input2.default = Input2;
    if (terminalHighlight && terminalHighlight.registerInput) {
      terminalHighlight.registerInput(Input2);
    }
  }
});

// node_modules/postcss/lib/map-generator.js
var require_map_generator = __commonJS({
  "node_modules/postcss/lib/map-generator.js"(exports, module2) {
    "use strict";
    var { SourceMapConsumer, SourceMapGenerator } = require_source_map();
    var { dirname: dirname2, resolve, relative, sep } = require("path");
    var { pathToFileURL } = require("url");
    var Input2 = require_input();
    var sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    var pathAvailable = Boolean(dirname2 && resolve && relative && sep);
    var MapGenerator = class {
      constructor(stringify2, root2, opts, cssString) {
        this.stringify = stringify2;
        this.mapOpts = opts.map || {};
        this.root = root2;
        this.opts = opts;
        this.css = cssString;
        this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
      }
      isMap() {
        if (typeof this.opts.map !== "undefined") {
          return !!this.opts.map;
        }
        return this.previous().length > 0;
      }
      previous() {
        if (!this.previousMaps) {
          this.previousMaps = [];
          if (this.root) {
            this.root.walk((node) => {
              if (node.source && node.source.input.map) {
                let map = node.source.input.map;
                if (!this.previousMaps.includes(map)) {
                  this.previousMaps.push(map);
                }
              }
            });
          } else {
            let input = new Input2(this.css, this.opts);
            if (input.map)
              this.previousMaps.push(input.map);
          }
        }
        return this.previousMaps;
      }
      isInline() {
        if (typeof this.mapOpts.inline !== "undefined") {
          return this.mapOpts.inline;
        }
        let annotation = this.mapOpts.annotation;
        if (typeof annotation !== "undefined" && annotation !== true) {
          return false;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.inline);
        }
        return true;
      }
      isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent !== "undefined") {
          return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.withContent());
        }
        return true;
      }
      clearAnnotation() {
        if (this.mapOpts.annotation === false)
          return;
        if (this.root) {
          let node;
          for (let i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type !== "comment")
              continue;
            if (node.text.indexOf("# sourceMappingURL=") === 0) {
              this.root.removeChild(i);
            }
          }
        } else if (this.css) {
          this.css = this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm, "");
        }
      }
      setSourcesContent() {
        let already = {};
        if (this.root) {
          this.root.walk((node) => {
            if (node.source) {
              let from = node.source.input.from;
              if (from && !already[from]) {
                already[from] = true;
                let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
                this.map.setSourceContent(fromUrl, node.source.input.css);
              }
            }
          });
        } else if (this.css) {
          let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
          this.map.setSourceContent(from, this.css);
        }
      }
      applyPrevMaps() {
        for (let prev of this.previous()) {
          let from = this.toUrl(this.path(prev.file));
          let root2 = prev.root || dirname2(prev.file);
          let map;
          if (this.mapOpts.sourcesContent === false) {
            map = new SourceMapConsumer(prev.text);
            if (map.sourcesContent) {
              map.sourcesContent = map.sourcesContent.map(() => null);
            }
          } else {
            map = prev.consumer();
          }
          this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
        }
      }
      isAnnotation() {
        if (this.isInline()) {
          return true;
        }
        if (typeof this.mapOpts.annotation !== "undefined") {
          return this.mapOpts.annotation;
        }
        if (this.previous().length) {
          return this.previous().some((i) => i.annotation);
        }
        return true;
      }
      toBase64(str) {
        if (Buffer) {
          return Buffer.from(str).toString("base64");
        } else {
          return window.btoa(unescape(encodeURIComponent(str)));
        }
      }
      addAnnotation() {
        let content;
        if (this.isInline()) {
          content = "data:application/json;base64," + this.toBase64(this.map.toString());
        } else if (typeof this.mapOpts.annotation === "string") {
          content = this.mapOpts.annotation;
        } else if (typeof this.mapOpts.annotation === "function") {
          content = this.mapOpts.annotation(this.opts.to, this.root);
        } else {
          content = this.outputFile() + ".map";
        }
        let eol = "\n";
        if (this.css.includes("\r\n"))
          eol = "\r\n";
        this.css += eol + "/*# sourceMappingURL=" + content + " */";
      }
      outputFile() {
        if (this.opts.to) {
          return this.path(this.opts.to);
        } else if (this.opts.from) {
          return this.path(this.opts.from);
        } else {
          return "to.css";
        }
      }
      generateMap() {
        if (this.root) {
          this.generateString();
        } else if (this.previous().length === 1) {
          let prev = this.previous()[0].consumer();
          prev.file = this.outputFile();
          this.map = SourceMapGenerator.fromSourceMap(prev);
        } else {
          this.map = new SourceMapGenerator({ file: this.outputFile() });
          this.map.addMapping({
            source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>",
            generated: { line: 1, column: 0 },
            original: { line: 1, column: 0 }
          });
        }
        if (this.isSourcesContent())
          this.setSourcesContent();
        if (this.root && this.previous().length > 0)
          this.applyPrevMaps();
        if (this.isAnnotation())
          this.addAnnotation();
        if (this.isInline()) {
          return [this.css];
        } else {
          return [this.css, this.map];
        }
      }
      path(file) {
        if (file.indexOf("<") === 0)
          return file;
        if (/^\w+:\/\//.test(file))
          return file;
        if (this.mapOpts.absolute)
          return file;
        let from = this.opts.to ? dirname2(this.opts.to) : ".";
        if (typeof this.mapOpts.annotation === "string") {
          from = dirname2(resolve(from, this.mapOpts.annotation));
        }
        file = relative(from, file);
        return file;
      }
      toUrl(path3) {
        if (sep === "\\") {
          path3 = path3.replace(/\\/g, "/");
        }
        return encodeURI(path3).replace(/[#?]/g, encodeURIComponent);
      }
      toFileUrl(path3) {
        if (pathToFileURL) {
          return pathToFileURL(path3).toString();
        } else {
          throw new Error(
            "`map.absolute` option is not available in this PostCSS build"
          );
        }
      }
      sourcePath(node) {
        if (this.mapOpts.from) {
          return this.toUrl(this.mapOpts.from);
        } else if (this.usesFileUrls) {
          return this.toFileUrl(node.source.input.from);
        } else {
          return this.toUrl(this.path(node.source.input.from));
        }
      }
      generateString() {
        this.css = "";
        this.map = new SourceMapGenerator({ file: this.outputFile() });
        let line = 1;
        let column = 1;
        let noSource = "<no source>";
        let mapping = {
          source: "",
          generated: { line: 0, column: 0 },
          original: { line: 0, column: 0 }
        };
        let lines, last;
        this.stringify(this.root, (str, node, type) => {
          this.css += str;
          if (node && type !== "end") {
            mapping.generated.line = line;
            mapping.generated.column = column - 1;
            if (node.source && node.source.start) {
              mapping.source = this.sourcePath(node);
              mapping.original.line = node.source.start.line;
              mapping.original.column = node.source.start.column - 1;
              this.map.addMapping(mapping);
            } else {
              mapping.source = noSource;
              mapping.original.line = 1;
              mapping.original.column = 0;
              this.map.addMapping(mapping);
            }
          }
          lines = str.match(/\n/g);
          if (lines) {
            line += lines.length;
            last = str.lastIndexOf("\n");
            column = str.length - last;
          } else {
            column += str.length;
          }
          if (node && type !== "start") {
            let p = node.parent || { raws: {} };
            let childless = node.type === "decl" || node.type === "atrule" && !node.nodes;
            if (!childless || node !== p.last || p.raws.semicolon) {
              if (node.source && node.source.end) {
                mapping.source = this.sourcePath(node);
                mapping.original.line = node.source.end.line;
                mapping.original.column = node.source.end.column - 1;
                mapping.generated.line = line;
                mapping.generated.column = column - 2;
                this.map.addMapping(mapping);
              } else {
                mapping.source = noSource;
                mapping.original.line = 1;
                mapping.original.column = 0;
                mapping.generated.line = line;
                mapping.generated.column = column - 1;
                this.map.addMapping(mapping);
              }
            }
          }
        });
      }
      generate() {
        this.clearAnnotation();
        if (pathAvailable && sourceMapAvailable && this.isMap()) {
          return this.generateMap();
        } else {
          let result = "";
          this.stringify(this.root, (i) => {
            result += i;
          });
          return [result];
        }
      }
    };
    module2.exports = MapGenerator;
  }
});

// node_modules/postcss/lib/comment.js
var require_comment = __commonJS({
  "node_modules/postcss/lib/comment.js"(exports, module2) {
    "use strict";
    var Node3 = require_node();
    var Comment2 = class extends Node3 {
      constructor(defaults) {
        super(defaults);
        this.type = "comment";
      }
    };
    module2.exports = Comment2;
    Comment2.default = Comment2;
  }
});

// node_modules/postcss/lib/container.js
var require_container = __commonJS({
  "node_modules/postcss/lib/container.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var Declaration2 = require_declaration();
    var Comment2 = require_comment();
    var Node3 = require_node();
    var parse2;
    var Rule2;
    var AtRule2;
    var Root2;
    function cleanSource(nodes) {
      return nodes.map((i) => {
        if (i.nodes)
          i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
      });
    }
    function markDirtyUp(node) {
      node[isClean] = false;
      if (node.proxyOf.nodes) {
        for (let i of node.proxyOf.nodes) {
          markDirtyUp(i);
        }
      }
    }
    var Container2 = class extends Node3 {
      push(child) {
        child.parent = this;
        this.proxyOf.nodes.push(child);
        return this;
      }
      each(callback) {
        if (!this.proxyOf.nodes)
          return void 0;
        let iterator = this.getIterator();
        let index, result;
        while (this.indexes[iterator] < this.proxyOf.nodes.length) {
          index = this.indexes[iterator];
          result = callback(this.proxyOf.nodes[index], index);
          if (result === false)
            break;
          this.indexes[iterator] += 1;
        }
        delete this.indexes[iterator];
        return result;
      }
      walk(callback) {
        return this.each((child, i) => {
          let result;
          try {
            result = callback(child, i);
          } catch (e) {
            throw child.addToError(e);
          }
          if (result !== false && child.walk) {
            result = child.walk(callback);
          }
          return result;
        });
      }
      walkDecls(prop, callback) {
        if (!callback) {
          callback = prop;
          return this.walk((child, i) => {
            if (child.type === "decl") {
              return callback(child, i);
            }
          });
        }
        if (prop instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "decl" && prop.test(child.prop)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "decl" && child.prop === prop) {
            return callback(child, i);
          }
        });
      }
      walkRules(selector, callback) {
        if (!callback) {
          callback = selector;
          return this.walk((child, i) => {
            if (child.type === "rule") {
              return callback(child, i);
            }
          });
        }
        if (selector instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "rule" && selector.test(child.selector)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "rule" && child.selector === selector) {
            return callback(child, i);
          }
        });
      }
      walkAtRules(name, callback) {
        if (!callback) {
          callback = name;
          return this.walk((child, i) => {
            if (child.type === "atrule") {
              return callback(child, i);
            }
          });
        }
        if (name instanceof RegExp) {
          return this.walk((child, i) => {
            if (child.type === "atrule" && name.test(child.name)) {
              return callback(child, i);
            }
          });
        }
        return this.walk((child, i) => {
          if (child.type === "atrule" && child.name === name) {
            return callback(child, i);
          }
        });
      }
      walkComments(callback) {
        return this.walk((child, i) => {
          if (child.type === "comment") {
            return callback(child, i);
          }
        });
      }
      append(...children) {
        for (let child of children) {
          let nodes = this.normalize(child, this.last);
          for (let node of nodes)
            this.proxyOf.nodes.push(node);
        }
        this.markDirty();
        return this;
      }
      prepend(...children) {
        children = children.reverse();
        for (let child of children) {
          let nodes = this.normalize(child, this.first, "prepend").reverse();
          for (let node of nodes)
            this.proxyOf.nodes.unshift(node);
          for (let id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      cleanRaws(keepBetween) {
        super.cleanRaws(keepBetween);
        if (this.nodes) {
          for (let node of this.nodes)
            node.cleanRaws(keepBetween);
        }
      }
      insertBefore(exist, add) {
        let existIndex = this.index(exist);
        let type = existIndex === 0 ? "prepend" : false;
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
        existIndex = this.index(exist);
        for (let node of nodes)
          this.proxyOf.nodes.splice(existIndex, 0, node);
        let index;
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (existIndex <= index) {
            this.indexes[id] = index + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      insertAfter(exist, add) {
        let existIndex = this.index(exist);
        let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
        existIndex = this.index(exist);
        for (let node of nodes)
          this.proxyOf.nodes.splice(existIndex + 1, 0, node);
        let index;
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (existIndex < index) {
            this.indexes[id] = index + nodes.length;
          }
        }
        this.markDirty();
        return this;
      }
      removeChild(child) {
        child = this.index(child);
        this.proxyOf.nodes[child].parent = void 0;
        this.proxyOf.nodes.splice(child, 1);
        let index;
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (index >= child) {
            this.indexes[id] = index - 1;
          }
        }
        this.markDirty();
        return this;
      }
      removeAll() {
        for (let node of this.proxyOf.nodes)
          node.parent = void 0;
        this.proxyOf.nodes = [];
        this.markDirty();
        return this;
      }
      replaceValues(pattern, opts, callback) {
        if (!callback) {
          callback = opts;
          opts = {};
        }
        this.walkDecls((decl2) => {
          if (opts.props && !opts.props.includes(decl2.prop))
            return;
          if (opts.fast && !decl2.value.includes(opts.fast))
            return;
          decl2.value = decl2.value.replace(pattern, callback);
        });
        this.markDirty();
        return this;
      }
      every(condition) {
        return this.nodes.every(condition);
      }
      some(condition) {
        return this.nodes.some(condition);
      }
      index(child) {
        if (typeof child === "number")
          return child;
        if (child.proxyOf)
          child = child.proxyOf;
        return this.proxyOf.nodes.indexOf(child);
      }
      get first() {
        if (!this.proxyOf.nodes)
          return void 0;
        return this.proxyOf.nodes[0];
      }
      get last() {
        if (!this.proxyOf.nodes)
          return void 0;
        return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
      }
      normalize(nodes, sample) {
        if (typeof nodes === "string") {
          nodes = cleanSource(parse2(nodes).nodes);
        } else if (Array.isArray(nodes)) {
          nodes = nodes.slice(0);
          for (let i of nodes) {
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type === "root" && this.type !== "document") {
          nodes = nodes.nodes.slice(0);
          for (let i of nodes) {
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type) {
          nodes = [nodes];
        } else if (nodes.prop) {
          if (typeof nodes.value === "undefined") {
            throw new Error("Value field is missed in node creation");
          } else if (typeof nodes.value !== "string") {
            nodes.value = String(nodes.value);
          }
          nodes = [new Declaration2(nodes)];
        } else if (nodes.selector) {
          nodes = [new Rule2(nodes)];
        } else if (nodes.name) {
          nodes = [new AtRule2(nodes)];
        } else if (nodes.text) {
          nodes = [new Comment2(nodes)];
        } else {
          throw new Error("Unknown node type in node creation");
        }
        let processed = nodes.map((i) => {
          if (!i[my])
            Container2.rebuild(i);
          i = i.proxyOf;
          if (i.parent)
            i.parent.removeChild(i);
          if (i[isClean])
            markDirtyUp(i);
          if (typeof i.raws.before === "undefined") {
            if (sample && typeof sample.raws.before !== "undefined") {
              i.raws.before = sample.raws.before.replace(/\S/g, "");
            }
          }
          i.parent = this.proxyOf;
          return i;
        });
        return processed;
      }
      getProxyProcessor() {
        return {
          set(node, prop, value) {
            if (node[prop] === value)
              return true;
            node[prop] = value;
            if (prop === "name" || prop === "params" || prop === "selector") {
              node.markDirty();
            }
            return true;
          },
          get(node, prop) {
            if (prop === "proxyOf") {
              return node;
            } else if (!node[prop]) {
              return node[prop];
            } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
              return (...args) => {
                return node[prop](
                  ...args.map((i) => {
                    if (typeof i === "function") {
                      return (child, index) => i(child.toProxy(), index);
                    } else {
                      return i;
                    }
                  })
                );
              };
            } else if (prop === "every" || prop === "some") {
              return (cb) => {
                return node[prop](
                  (child, ...other) => cb(child.toProxy(), ...other)
                );
              };
            } else if (prop === "root") {
              return () => node.root().toProxy();
            } else if (prop === "nodes") {
              return node.nodes.map((i) => i.toProxy());
            } else if (prop === "first" || prop === "last") {
              return node[prop].toProxy();
            } else {
              return node[prop];
            }
          }
        };
      }
      getIterator() {
        if (!this.lastEach)
          this.lastEach = 0;
        if (!this.indexes)
          this.indexes = {};
        this.lastEach += 1;
        let iterator = this.lastEach;
        this.indexes[iterator] = 0;
        return iterator;
      }
    };
    Container2.registerParse = (dependant) => {
      parse2 = dependant;
    };
    Container2.registerRule = (dependant) => {
      Rule2 = dependant;
    };
    Container2.registerAtRule = (dependant) => {
      AtRule2 = dependant;
    };
    Container2.registerRoot = (dependant) => {
      Root2 = dependant;
    };
    module2.exports = Container2;
    Container2.default = Container2;
    Container2.rebuild = (node) => {
      if (node.type === "atrule") {
        Object.setPrototypeOf(node, AtRule2.prototype);
      } else if (node.type === "rule") {
        Object.setPrototypeOf(node, Rule2.prototype);
      } else if (node.type === "decl") {
        Object.setPrototypeOf(node, Declaration2.prototype);
      } else if (node.type === "comment") {
        Object.setPrototypeOf(node, Comment2.prototype);
      } else if (node.type === "root") {
        Object.setPrototypeOf(node, Root2.prototype);
      }
      node[my] = true;
      if (node.nodes) {
        node.nodes.forEach((child) => {
          Container2.rebuild(child);
        });
      }
    };
  }
});

// node_modules/postcss/lib/document.js
var require_document = __commonJS({
  "node_modules/postcss/lib/document.js"(exports, module2) {
    "use strict";
    var Container2 = require_container();
    var LazyResult;
    var Processor2;
    var Document2 = class extends Container2 {
      constructor(defaults) {
        super({ type: "document", ...defaults });
        if (!this.nodes) {
          this.nodes = [];
        }
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor2(), this, opts);
        return lazy.stringify();
      }
    };
    Document2.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Document2.registerProcessor = (dependant) => {
      Processor2 = dependant;
    };
    module2.exports = Document2;
    Document2.default = Document2;
  }
});

// node_modules/postcss/lib/warn-once.js
var require_warn_once = __commonJS({
  "node_modules/postcss/lib/warn-once.js"(exports, module2) {
    "use strict";
    var printed = {};
    module2.exports = function warnOnce(message) {
      if (printed[message])
        return;
      printed[message] = true;
      if (typeof console !== "undefined" && console.warn) {
        console.warn(message);
      }
    };
  }
});

// node_modules/postcss/lib/warning.js
var require_warning = __commonJS({
  "node_modules/postcss/lib/warning.js"(exports, module2) {
    "use strict";
    var Warning2 = class {
      constructor(text, opts = {}) {
        this.type = "warning";
        this.text = text;
        if (opts.node && opts.node.source) {
          let range = opts.node.rangeBy(opts);
          this.line = range.start.line;
          this.column = range.start.column;
          this.endLine = range.end.line;
          this.endColumn = range.end.column;
        }
        for (let opt in opts)
          this[opt] = opts[opt];
      }
      toString() {
        if (this.node) {
          return this.node.error(this.text, {
            plugin: this.plugin,
            index: this.index,
            word: this.word
          }).message;
        }
        if (this.plugin) {
          return this.plugin + ": " + this.text;
        }
        return this.text;
      }
    };
    module2.exports = Warning2;
    Warning2.default = Warning2;
  }
});

// node_modules/postcss/lib/result.js
var require_result = __commonJS({
  "node_modules/postcss/lib/result.js"(exports, module2) {
    "use strict";
    var Warning2 = require_warning();
    var Result3 = class {
      constructor(processor, root2, opts) {
        this.processor = processor;
        this.messages = [];
        this.root = root2;
        this.opts = opts;
        this.css = void 0;
        this.map = void 0;
      }
      toString() {
        return this.css;
      }
      warn(text, opts = {}) {
        if (!opts.plugin) {
          if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
            opts.plugin = this.lastPlugin.postcssPlugin;
          }
        }
        let warning = new Warning2(text, opts);
        this.messages.push(warning);
        return warning;
      }
      warnings() {
        return this.messages.filter((i) => i.type === "warning");
      }
      get content() {
        return this.css;
      }
    };
    module2.exports = Result3;
    Result3.default = Result3;
  }
});

// node_modules/postcss/lib/at-rule.js
var require_at_rule = __commonJS({
  "node_modules/postcss/lib/at-rule.js"(exports, module2) {
    "use strict";
    var Container2 = require_container();
    var AtRule2 = class extends Container2 {
      constructor(defaults) {
        super(defaults);
        this.type = "atrule";
      }
      append(...children) {
        if (!this.proxyOf.nodes)
          this.nodes = [];
        return super.append(...children);
      }
      prepend(...children) {
        if (!this.proxyOf.nodes)
          this.nodes = [];
        return super.prepend(...children);
      }
    };
    module2.exports = AtRule2;
    AtRule2.default = AtRule2;
    Container2.registerAtRule(AtRule2);
  }
});

// node_modules/postcss/lib/root.js
var require_root = __commonJS({
  "node_modules/postcss/lib/root.js"(exports, module2) {
    "use strict";
    var Container2 = require_container();
    var LazyResult;
    var Processor2;
    var Root2 = class extends Container2 {
      constructor(defaults) {
        super(defaults);
        this.type = "root";
        if (!this.nodes)
          this.nodes = [];
      }
      removeChild(child, ignore) {
        let index = this.index(child);
        if (!ignore && index === 0 && this.nodes.length > 1) {
          this.nodes[1].raws.before = this.nodes[index].raws.before;
        }
        return super.removeChild(child);
      }
      normalize(child, sample, type) {
        let nodes = super.normalize(child);
        if (sample) {
          if (type === "prepend") {
            if (this.nodes.length > 1) {
              sample.raws.before = this.nodes[1].raws.before;
            } else {
              delete sample.raws.before;
            }
          } else if (this.first !== sample) {
            for (let node of nodes) {
              node.raws.before = sample.raws.before;
            }
          }
        }
        return nodes;
      }
      toResult(opts = {}) {
        let lazy = new LazyResult(new Processor2(), this, opts);
        return lazy.stringify();
      }
    };
    Root2.registerLazyResult = (dependant) => {
      LazyResult = dependant;
    };
    Root2.registerProcessor = (dependant) => {
      Processor2 = dependant;
    };
    module2.exports = Root2;
    Root2.default = Root2;
    Container2.registerRoot(Root2);
  }
});

// node_modules/postcss/lib/list.js
var require_list = __commonJS({
  "node_modules/postcss/lib/list.js"(exports, module2) {
    "use strict";
    var list2 = {
      split(string, separators, last) {
        let array = [];
        let current = "";
        let split = false;
        let func = 0;
        let inQuote = false;
        let prevQuote = "";
        let escape = false;
        for (let letter of string) {
          if (escape) {
            escape = false;
          } else if (letter === "\\") {
            escape = true;
          } else if (inQuote) {
            if (letter === prevQuote) {
              inQuote = false;
            }
          } else if (letter === '"' || letter === "'") {
            inQuote = true;
            prevQuote = letter;
          } else if (letter === "(") {
            func += 1;
          } else if (letter === ")") {
            if (func > 0)
              func -= 1;
          } else if (func === 0) {
            if (separators.includes(letter))
              split = true;
          }
          if (split) {
            if (current !== "")
              array.push(current.trim());
            current = "";
            split = false;
          } else {
            current += letter;
          }
        }
        if (last || current !== "")
          array.push(current.trim());
        return array;
      },
      space(string) {
        let spaces = [" ", "\n", "	"];
        return list2.split(string, spaces);
      },
      comma(string) {
        return list2.split(string, [","], true);
      }
    };
    module2.exports = list2;
    list2.default = list2;
  }
});

// node_modules/postcss/lib/rule.js
var require_rule = __commonJS({
  "node_modules/postcss/lib/rule.js"(exports, module2) {
    "use strict";
    var Container2 = require_container();
    var list2 = require_list();
    var Rule2 = class extends Container2 {
      constructor(defaults) {
        super(defaults);
        this.type = "rule";
        if (!this.nodes)
          this.nodes = [];
      }
      get selectors() {
        return list2.comma(this.selector);
      }
      set selectors(values) {
        let match = this.selector ? this.selector.match(/,\s*/) : null;
        let sep = match ? match[0] : "," + this.raw("between", "beforeOpen");
        this.selector = values.join(sep);
      }
    };
    module2.exports = Rule2;
    Rule2.default = Rule2;
    Container2.registerRule(Rule2);
  }
});

// node_modules/postcss/lib/parser.js
var require_parser = __commonJS({
  "node_modules/postcss/lib/parser.js"(exports, module2) {
    "use strict";
    var Declaration2 = require_declaration();
    var tokenizer = require_tokenize();
    var Comment2 = require_comment();
    var AtRule2 = require_at_rule();
    var Root2 = require_root();
    var Rule2 = require_rule();
    var SAFE_COMMENT_NEIGHBOR = {
      empty: true,
      space: true
    };
    function findLastWithPosition(tokens) {
      for (let i = tokens.length - 1; i >= 0; i--) {
        let token = tokens[i];
        let pos = token[3] || token[2];
        if (pos)
          return pos;
      }
    }
    var Parser = class {
      constructor(input) {
        this.input = input;
        this.root = new Root2();
        this.current = this.root;
        this.spaces = "";
        this.semicolon = false;
        this.customProperty = false;
        this.createTokenizer();
        this.root.source = { input, start: { offset: 0, line: 1, column: 1 } };
      }
      createTokenizer() {
        this.tokenizer = tokenizer(this.input);
      }
      parse() {
        let token;
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          switch (token[0]) {
            case "space":
              this.spaces += token[1];
              break;
            case ";":
              this.freeSemicolon(token);
              break;
            case "}":
              this.end(token);
              break;
            case "comment":
              this.comment(token);
              break;
            case "at-word":
              this.atrule(token);
              break;
            case "{":
              this.emptyRule(token);
              break;
            default:
              this.other(token);
              break;
          }
        }
        this.endFile();
      }
      comment(token) {
        let node = new Comment2();
        this.init(node, token[2]);
        node.source.end = this.getPosition(token[3] || token[2]);
        let text = token[1].slice(2, -2);
        if (/^\s*$/.test(text)) {
          node.text = "";
          node.raws.left = text;
          node.raws.right = "";
        } else {
          let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
          node.text = match[2];
          node.raws.left = match[1];
          node.raws.right = match[3];
        }
      }
      emptyRule(token) {
        let node = new Rule2();
        this.init(node, token[2]);
        node.selector = "";
        node.raws.between = "";
        this.current = node;
      }
      other(start) {
        let end = false;
        let type = null;
        let colon = false;
        let bracket = null;
        let brackets = [];
        let customProperty = start[1].startsWith("--");
        let tokens = [];
        let token = start;
        while (token) {
          type = token[0];
          tokens.push(token);
          if (type === "(" || type === "[") {
            if (!bracket)
              bracket = token;
            brackets.push(type === "(" ? ")" : "]");
          } else if (customProperty && colon && type === "{") {
            if (!bracket)
              bracket = token;
            brackets.push("}");
          } else if (brackets.length === 0) {
            if (type === ";") {
              if (colon) {
                this.decl(tokens, customProperty);
                return;
              } else {
                break;
              }
            } else if (type === "{") {
              this.rule(tokens);
              return;
            } else if (type === "}") {
              this.tokenizer.back(tokens.pop());
              end = true;
              break;
            } else if (type === ":") {
              colon = true;
            }
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
            if (brackets.length === 0)
              bracket = null;
          }
          token = this.tokenizer.nextToken();
        }
        if (this.tokenizer.endOfFile())
          end = true;
        if (brackets.length > 0)
          this.unclosedBracket(bracket);
        if (end && colon) {
          if (!customProperty) {
            while (tokens.length) {
              token = tokens[tokens.length - 1][0];
              if (token !== "space" && token !== "comment")
                break;
              this.tokenizer.back(tokens.pop());
            }
          }
          this.decl(tokens, customProperty);
        } else {
          this.unknownWord(tokens);
        }
      }
      rule(tokens) {
        tokens.pop();
        let node = new Rule2();
        this.init(node, tokens[0][2]);
        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, "selector", tokens);
        this.current = node;
      }
      decl(tokens, customProperty) {
        let node = new Declaration2();
        this.init(node, tokens[0][2]);
        let last = tokens[tokens.length - 1];
        if (last[0] === ";") {
          this.semicolon = true;
          tokens.pop();
        }
        node.source.end = this.getPosition(
          last[3] || last[2] || findLastWithPosition(tokens)
        );
        while (tokens[0][0] !== "word") {
          if (tokens.length === 1)
            this.unknownWord(tokens);
          node.raws.before += tokens.shift()[1];
        }
        node.source.start = this.getPosition(tokens[0][2]);
        node.prop = "";
        while (tokens.length) {
          let type = tokens[0][0];
          if (type === ":" || type === "space" || type === "comment") {
            break;
          }
          node.prop += tokens.shift()[1];
        }
        node.raws.between = "";
        let token;
        while (tokens.length) {
          token = tokens.shift();
          if (token[0] === ":") {
            node.raws.between += token[1];
            break;
          } else {
            if (token[0] === "word" && /\w/.test(token[1])) {
              this.unknownWord([token]);
            }
            node.raws.between += token[1];
          }
        }
        if (node.prop[0] === "_" || node.prop[0] === "*") {
          node.raws.before += node.prop[0];
          node.prop = node.prop.slice(1);
        }
        let firstSpaces = [];
        let next;
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          firstSpaces.push(tokens.shift());
        }
        this.precheckMissedSemicolon(tokens);
        for (let i = tokens.length - 1; i >= 0; i--) {
          token = tokens[i];
          if (token[1].toLowerCase() === "!important") {
            node.important = true;
            let string = this.stringFrom(tokens, i);
            string = this.spacesFromEnd(tokens) + string;
            if (string !== " !important")
              node.raws.important = string;
            break;
          } else if (token[1].toLowerCase() === "important") {
            let cache = tokens.slice(0);
            let str = "";
            for (let j = i; j > 0; j--) {
              let type = cache[j][0];
              if (str.trim().indexOf("!") === 0 && type !== "space") {
                break;
              }
              str = cache.pop()[1] + str;
            }
            if (str.trim().indexOf("!") === 0) {
              node.important = true;
              node.raws.important = str;
              tokens = cache;
            }
          }
          if (token[0] !== "space" && token[0] !== "comment") {
            break;
          }
        }
        let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
        if (hasWord) {
          node.raws.between += firstSpaces.map((i) => i[1]).join("");
          firstSpaces = [];
        }
        this.raw(node, "value", firstSpaces.concat(tokens), customProperty);
        if (node.value.includes(":") && !customProperty) {
          this.checkMissedSemicolon(tokens);
        }
      }
      atrule(token) {
        let node = new AtRule2();
        node.name = token[1].slice(1);
        if (node.name === "") {
          this.unnamedAtrule(node, token);
        }
        this.init(node, token[2]);
        let type;
        let prev;
        let shift;
        let last = false;
        let open = false;
        let params = [];
        let brackets = [];
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          type = token[0];
          if (type === "(" || type === "[") {
            brackets.push(type === "(" ? ")" : "]");
          } else if (type === "{" && brackets.length > 0) {
            brackets.push("}");
          } else if (type === brackets[brackets.length - 1]) {
            brackets.pop();
          }
          if (brackets.length === 0) {
            if (type === ";") {
              node.source.end = this.getPosition(token[2]);
              this.semicolon = true;
              break;
            } else if (type === "{") {
              open = true;
              break;
            } else if (type === "}") {
              if (params.length > 0) {
                shift = params.length - 1;
                prev = params[shift];
                while (prev && prev[0] === "space") {
                  prev = params[--shift];
                }
                if (prev) {
                  node.source.end = this.getPosition(prev[3] || prev[2]);
                }
              }
              this.end(token);
              break;
            } else {
              params.push(token);
            }
          } else {
            params.push(token);
          }
          if (this.tokenizer.endOfFile()) {
            last = true;
            break;
          }
        }
        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
          node.raws.afterName = this.spacesAndCommentsFromStart(params);
          this.raw(node, "params", params);
          if (last) {
            token = params[params.length - 1];
            node.source.end = this.getPosition(token[3] || token[2]);
            this.spaces = node.raws.between;
            node.raws.between = "";
          }
        } else {
          node.raws.afterName = "";
          node.params = "";
        }
        if (open) {
          node.nodes = [];
          this.current = node;
        }
      }
      end(token) {
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        this.spaces = "";
        if (this.current.parent) {
          this.current.source.end = this.getPosition(token[2]);
          this.current = this.current.parent;
        } else {
          this.unexpectedClose(token);
        }
      }
      endFile() {
        if (this.current.parent)
          this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      }
      freeSemicolon(token) {
        this.spaces += token[1];
        if (this.current.nodes) {
          let prev = this.current.nodes[this.current.nodes.length - 1];
          if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
            prev.raws.ownSemicolon = this.spaces;
            this.spaces = "";
          }
        }
      }
      getPosition(offset) {
        let pos = this.input.fromOffset(offset);
        return {
          offset,
          line: pos.line,
          column: pos.col
        };
      }
      init(node, offset) {
        this.current.push(node);
        node.source = {
          start: this.getPosition(offset),
          input: this.input
        };
        node.raws.before = this.spaces;
        this.spaces = "";
        if (node.type !== "comment")
          this.semicolon = false;
      }
      raw(node, prop, tokens, customProperty) {
        let token, type;
        let length = tokens.length;
        let value = "";
        let clean = true;
        let next, prev;
        for (let i = 0; i < length; i += 1) {
          token = tokens[i];
          type = token[0];
          if (type === "space" && i === length - 1 && !customProperty) {
            clean = false;
          } else if (type === "comment") {
            prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
            next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
            if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
              if (value.slice(-1) === ",") {
                clean = false;
              } else {
                value += token[1];
              }
            } else {
              clean = false;
            }
          } else {
            value += token[1];
          }
        }
        if (!clean) {
          let raw = tokens.reduce((all, i) => all + i[1], "");
          node.raws[prop] = { value, raw };
        }
        node[prop] = value;
      }
      spacesAndCommentsFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space" && lastTokenType !== "comment")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      spacesAndCommentsFromStart(tokens) {
        let next;
        let spaces = "";
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          spaces += tokens.shift()[1];
        }
        return spaces;
      }
      spacesFromEnd(tokens) {
        let lastTokenType;
        let spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      }
      stringFrom(tokens, from) {
        let result = "";
        for (let i = from; i < tokens.length; i++) {
          result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
      }
      colon(tokens) {
        let brackets = 0;
        let token, type, prev;
        for (let [i, element] of tokens.entries()) {
          token = element;
          type = token[0];
          if (type === "(") {
            brackets += 1;
          }
          if (type === ")") {
            brackets -= 1;
          }
          if (brackets === 0 && type === ":") {
            if (!prev) {
              this.doubleColon(token);
            } else if (prev[0] === "word" && prev[1] === "progid") {
              continue;
            } else {
              return i;
            }
          }
          prev = token;
        }
        return false;
      }
      unclosedBracket(bracket) {
        throw this.input.error(
          "Unclosed bracket",
          { offset: bracket[2] },
          { offset: bracket[2] + 1 }
        );
      }
      unknownWord(tokens) {
        throw this.input.error(
          "Unknown word",
          { offset: tokens[0][2] },
          { offset: tokens[0][2] + tokens[0][1].length }
        );
      }
      unexpectedClose(token) {
        throw this.input.error(
          "Unexpected }",
          { offset: token[2] },
          { offset: token[2] + 1 }
        );
      }
      unclosedBlock() {
        let pos = this.current.source.start;
        throw this.input.error("Unclosed block", pos.line, pos.column);
      }
      doubleColon(token) {
        throw this.input.error(
          "Double colon",
          { offset: token[2] },
          { offset: token[2] + token[1].length }
        );
      }
      unnamedAtrule(node, token) {
        throw this.input.error(
          "At-rule without name",
          { offset: token[2] },
          { offset: token[2] + token[1].length }
        );
      }
      precheckMissedSemicolon() {
      }
      checkMissedSemicolon(tokens) {
        let colon = this.colon(tokens);
        if (colon === false)
          return;
        let founded = 0;
        let token;
        for (let j = colon - 1; j >= 0; j--) {
          token = tokens[j];
          if (token[0] !== "space") {
            founded += 1;
            if (founded === 2)
              break;
          }
        }
        throw this.input.error(
          "Missed semicolon",
          token[0] === "word" ? token[3] + 1 : token[2]
        );
      }
    };
    module2.exports = Parser;
  }
});

// node_modules/postcss/lib/parse.js
var require_parse = __commonJS({
  "node_modules/postcss/lib/parse.js"(exports, module2) {
    "use strict";
    var Container2 = require_container();
    var Parser = require_parser();
    var Input2 = require_input();
    function parse2(css, opts) {
      let input = new Input2(css, opts);
      let parser = new Parser(input);
      try {
        parser.parse();
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          if (e.name === "CssSyntaxError" && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
              e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
            } else if (/\.sass/i.test(opts.from)) {
              e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
            } else if (/\.less$/i.test(opts.from)) {
              e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
            }
          }
        }
        throw e;
      }
      return parser.root;
    }
    module2.exports = parse2;
    parse2.default = parse2;
    Container2.registerParse(parse2);
  }
});

// node_modules/postcss/lib/lazy-result.js
var require_lazy_result = __commonJS({
  "node_modules/postcss/lib/lazy-result.js"(exports, module2) {
    "use strict";
    var { isClean, my } = require_symbols();
    var MapGenerator = require_map_generator();
    var stringify2 = require_stringify();
    var Container2 = require_container();
    var Document2 = require_document();
    var warnOnce = require_warn_once();
    var Result3 = require_result();
    var parse2 = require_parse();
    var Root2 = require_root();
    var TYPE_TO_CLASS_NAME = {
      document: "Document",
      root: "Root",
      atrule: "AtRule",
      rule: "Rule",
      decl: "Declaration",
      comment: "Comment"
    };
    var PLUGIN_PROPS = {
      postcssPlugin: true,
      prepare: true,
      Once: true,
      Document: true,
      Root: true,
      Declaration: true,
      Rule: true,
      AtRule: true,
      Comment: true,
      DeclarationExit: true,
      RuleExit: true,
      AtRuleExit: true,
      CommentExit: true,
      RootExit: true,
      DocumentExit: true,
      OnceExit: true
    };
    var NOT_VISITORS = {
      postcssPlugin: true,
      prepare: true,
      Once: true
    };
    var CHILDREN = 0;
    function isPromise(obj) {
      return typeof obj === "object" && typeof obj.then === "function";
    }
    function getEvents(node) {
      let key = false;
      let type = TYPE_TO_CLASS_NAME[node.type];
      if (node.type === "decl") {
        key = node.prop.toLowerCase();
      } else if (node.type === "atrule") {
        key = node.name.toLowerCase();
      }
      if (key && node.append) {
        return [
          type,
          type + "-" + key,
          CHILDREN,
          type + "Exit",
          type + "Exit-" + key
        ];
      } else if (key) {
        return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
      } else if (node.append) {
        return [type, CHILDREN, type + "Exit"];
      } else {
        return [type, type + "Exit"];
      }
    }
    function toStack(node) {
      let events;
      if (node.type === "document") {
        events = ["Document", CHILDREN, "DocumentExit"];
      } else if (node.type === "root") {
        events = ["Root", CHILDREN, "RootExit"];
      } else {
        events = getEvents(node);
      }
      return {
        node,
        events,
        eventIndex: 0,
        visitors: [],
        visitorIndex: 0,
        iterator: 0
      };
    }
    function cleanMarks(node) {
      node[isClean] = false;
      if (node.nodes)
        node.nodes.forEach((i) => cleanMarks(i));
      return node;
    }
    var postcss2 = {};
    var LazyResult = class {
      constructor(processor, css, opts) {
        this.stringified = false;
        this.processed = false;
        let root2;
        if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
          root2 = cleanMarks(css);
        } else if (css instanceof LazyResult || css instanceof Result3) {
          root2 = cleanMarks(css.root);
          if (css.map) {
            if (typeof opts.map === "undefined")
              opts.map = {};
            if (!opts.map.inline)
              opts.map.inline = false;
            opts.map.prev = css.map;
          }
        } else {
          let parser = parse2;
          if (opts.syntax)
            parser = opts.syntax.parse;
          if (opts.parser)
            parser = opts.parser;
          if (parser.parse)
            parser = parser.parse;
          try {
            root2 = parser(css, opts);
          } catch (error) {
            this.processed = true;
            this.error = error;
          }
          if (root2 && !root2[my]) {
            Container2.rebuild(root2);
          }
        }
        this.result = new Result3(processor, root2, opts);
        this.helpers = { ...postcss2, result: this.result, postcss: postcss2 };
        this.plugins = this.processor.plugins.map((plugin2) => {
          if (typeof plugin2 === "object" && plugin2.prepare) {
            return { ...plugin2, ...plugin2.prepare(this.result) };
          } else {
            return plugin2;
          }
        });
      }
      get [Symbol.toStringTag]() {
        return "LazyResult";
      }
      get processor() {
        return this.result.processor;
      }
      get opts() {
        return this.result.opts;
      }
      get css() {
        return this.stringify().css;
      }
      get content() {
        return this.stringify().content;
      }
      get map() {
        return this.stringify().map;
      }
      get root() {
        return this.sync().root;
      }
      get messages() {
        return this.sync().messages;
      }
      warnings() {
        return this.sync().warnings();
      }
      toString() {
        return this.css;
      }
      then(onFulfilled, onRejected) {
        if (process.env.NODE_ENV !== "production") {
          if (!("from" in this.opts)) {
            warnOnce(
              "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
            );
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      async() {
        if (this.error)
          return Promise.reject(this.error);
        if (this.processed)
          return Promise.resolve(this.result);
        if (!this.processing) {
          this.processing = this.runAsync();
        }
        return this.processing;
      }
      sync() {
        if (this.error)
          throw this.error;
        if (this.processed)
          return this.result;
        this.processed = true;
        if (this.processing) {
          throw this.getAsyncError();
        }
        for (let plugin2 of this.plugins) {
          let promise = this.runOnRoot(plugin2);
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root2 = this.result.root;
          while (!root2[isClean]) {
            root2[isClean] = true;
            this.walkSync(root2);
          }
          if (this.listeners.OnceExit) {
            if (root2.type === "document") {
              for (let subRoot of root2.nodes) {
                this.visitSync(this.listeners.OnceExit, subRoot);
              }
            } else {
              this.visitSync(this.listeners.OnceExit, root2);
            }
          }
        }
        return this.result;
      }
      stringify() {
        if (this.error)
          throw this.error;
        if (this.stringified)
          return this.result;
        this.stringified = true;
        this.sync();
        let opts = this.result.opts;
        let str = stringify2;
        if (opts.syntax)
          str = opts.syntax.stringify;
        if (opts.stringifier)
          str = opts.stringifier;
        if (str.stringify)
          str = str.stringify;
        let map = new MapGenerator(str, this.result.root, this.result.opts);
        let data = map.generate();
        this.result.css = data[0];
        this.result.map = data[1];
        return this.result;
      }
      walkSync(node) {
        node[isClean] = true;
        let events = getEvents(node);
        for (let event of events) {
          if (event === CHILDREN) {
            if (node.nodes) {
              node.each((child) => {
                if (!child[isClean])
                  this.walkSync(child);
              });
            }
          } else {
            let visitors = this.listeners[event];
            if (visitors) {
              if (this.visitSync(visitors, node.toProxy()))
                return;
            }
          }
        }
      }
      visitSync(visitors, node) {
        for (let [plugin2, visitor] of visitors) {
          this.result.lastPlugin = plugin2;
          let promise;
          try {
            promise = visitor(node, this.helpers);
          } catch (e) {
            throw this.handleError(e, node.proxyOf);
          }
          if (node.type !== "root" && node.type !== "document" && !node.parent) {
            return true;
          }
          if (isPromise(promise)) {
            throw this.getAsyncError();
          }
        }
      }
      runOnRoot(plugin2) {
        this.result.lastPlugin = plugin2;
        try {
          if (typeof plugin2 === "object" && plugin2.Once) {
            if (this.result.root.type === "document") {
              let roots = this.result.root.nodes.map(
                (root2) => plugin2.Once(root2, this.helpers)
              );
              if (isPromise(roots[0])) {
                return Promise.all(roots);
              }
              return roots;
            }
            return plugin2.Once(this.result.root, this.helpers);
          } else if (typeof plugin2 === "function") {
            return plugin2(this.result.root, this.result);
          }
        } catch (error) {
          throw this.handleError(error);
        }
      }
      getAsyncError() {
        throw new Error("Use process(css).then(cb) to work with async plugins");
      }
      handleError(error, node) {
        let plugin2 = this.result.lastPlugin;
        try {
          if (node)
            node.addToError(error);
          this.error = error;
          if (error.name === "CssSyntaxError" && !error.plugin) {
            error.plugin = plugin2.postcssPlugin;
            error.setMessage();
          } else if (plugin2.postcssVersion) {
            if (process.env.NODE_ENV !== "production") {
              let pluginName = plugin2.postcssPlugin;
              let pluginVer = plugin2.postcssVersion;
              let runtimeVer = this.result.processor.version;
              let a = pluginVer.split(".");
              let b = runtimeVer.split(".");
              if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                console.error(
                  "Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below."
                );
              }
            }
          }
        } catch (err) {
          if (console && console.error)
            console.error(err);
        }
        return error;
      }
      async runAsync() {
        this.plugin = 0;
        for (let i = 0; i < this.plugins.length; i++) {
          let plugin2 = this.plugins[i];
          let promise = this.runOnRoot(plugin2);
          if (isPromise(promise)) {
            try {
              await promise;
            } catch (error) {
              throw this.handleError(error);
            }
          }
        }
        this.prepareVisitors();
        if (this.hasListener) {
          let root2 = this.result.root;
          while (!root2[isClean]) {
            root2[isClean] = true;
            let stack = [toStack(root2)];
            while (stack.length > 0) {
              let promise = this.visitTick(stack);
              if (isPromise(promise)) {
                try {
                  await promise;
                } catch (e) {
                  let node = stack[stack.length - 1].node;
                  throw this.handleError(e, node);
                }
              }
            }
          }
          if (this.listeners.OnceExit) {
            for (let [plugin2, visitor] of this.listeners.OnceExit) {
              this.result.lastPlugin = plugin2;
              try {
                if (root2.type === "document") {
                  let roots = root2.nodes.map(
                    (subRoot) => visitor(subRoot, this.helpers)
                  );
                  await Promise.all(roots);
                } else {
                  await visitor(root2, this.helpers);
                }
              } catch (e) {
                throw this.handleError(e);
              }
            }
          }
        }
        this.processed = true;
        return this.stringify();
      }
      prepareVisitors() {
        this.listeners = {};
        let add = (plugin2, type, cb) => {
          if (!this.listeners[type])
            this.listeners[type] = [];
          this.listeners[type].push([plugin2, cb]);
        };
        for (let plugin2 of this.plugins) {
          if (typeof plugin2 === "object") {
            for (let event in plugin2) {
              if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
                throw new Error(
                  `Unknown event ${event} in ${plugin2.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
                );
              }
              if (!NOT_VISITORS[event]) {
                if (typeof plugin2[event] === "object") {
                  for (let filter in plugin2[event]) {
                    if (filter === "*") {
                      add(plugin2, event, plugin2[event][filter]);
                    } else {
                      add(
                        plugin2,
                        event + "-" + filter.toLowerCase(),
                        plugin2[event][filter]
                      );
                    }
                  }
                } else if (typeof plugin2[event] === "function") {
                  add(plugin2, event, plugin2[event]);
                }
              }
            }
          }
        }
        this.hasListener = Object.keys(this.listeners).length > 0;
      }
      visitTick(stack) {
        let visit = stack[stack.length - 1];
        let { node, visitors } = visit;
        if (node.type !== "root" && node.type !== "document" && !node.parent) {
          stack.pop();
          return;
        }
        if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
          let [plugin2, visitor] = visitors[visit.visitorIndex];
          visit.visitorIndex += 1;
          if (visit.visitorIndex === visitors.length) {
            visit.visitors = [];
            visit.visitorIndex = 0;
          }
          this.result.lastPlugin = plugin2;
          try {
            return visitor(node.toProxy(), this.helpers);
          } catch (e) {
            throw this.handleError(e, node);
          }
        }
        if (visit.iterator !== 0) {
          let iterator = visit.iterator;
          let child;
          while (child = node.nodes[node.indexes[iterator]]) {
            node.indexes[iterator] += 1;
            if (!child[isClean]) {
              child[isClean] = true;
              stack.push(toStack(child));
              return;
            }
          }
          visit.iterator = 0;
          delete node.indexes[iterator];
        }
        let events = visit.events;
        while (visit.eventIndex < events.length) {
          let event = events[visit.eventIndex];
          visit.eventIndex += 1;
          if (event === CHILDREN) {
            if (node.nodes && node.nodes.length) {
              node[isClean] = true;
              visit.iterator = node.getIterator();
            }
            return;
          } else if (this.listeners[event]) {
            visit.visitors = this.listeners[event];
            return;
          }
        }
        stack.pop();
      }
    };
    LazyResult.registerPostcss = (dependant) => {
      postcss2 = dependant;
    };
    module2.exports = LazyResult;
    LazyResult.default = LazyResult;
    Root2.registerLazyResult(LazyResult);
    Document2.registerLazyResult(LazyResult);
  }
});

// node_modules/postcss/lib/no-work-result.js
var require_no_work_result = __commonJS({
  "node_modules/postcss/lib/no-work-result.js"(exports, module2) {
    "use strict";
    var MapGenerator = require_map_generator();
    var stringify2 = require_stringify();
    var warnOnce = require_warn_once();
    var parse2 = require_parse();
    var Result3 = require_result();
    var NoWorkResult = class {
      constructor(processor, css, opts) {
        css = css.toString();
        this.stringified = false;
        this._processor = processor;
        this._css = css;
        this._opts = opts;
        this._map = void 0;
        let root2;
        let str = stringify2;
        this.result = new Result3(this._processor, root2, this._opts);
        this.result.css = css;
        let self = this;
        Object.defineProperty(this.result, "root", {
          get() {
            return self.root;
          }
        });
        let map = new MapGenerator(str, root2, this._opts, css);
        if (map.isMap()) {
          let [generatedCSS, generatedMap] = map.generate();
          if (generatedCSS) {
            this.result.css = generatedCSS;
          }
          if (generatedMap) {
            this.result.map = generatedMap;
          }
        }
      }
      get [Symbol.toStringTag]() {
        return "NoWorkResult";
      }
      get processor() {
        return this.result.processor;
      }
      get opts() {
        return this.result.opts;
      }
      get css() {
        return this.result.css;
      }
      get content() {
        return this.result.css;
      }
      get map() {
        return this.result.map;
      }
      get root() {
        if (this._root) {
          return this._root;
        }
        let root2;
        let parser = parse2;
        try {
          root2 = parser(this._css, this._opts);
        } catch (error) {
          this.error = error;
        }
        if (this.error) {
          throw this.error;
        } else {
          this._root = root2;
          return root2;
        }
      }
      get messages() {
        return [];
      }
      warnings() {
        return [];
      }
      toString() {
        return this._css;
      }
      then(onFulfilled, onRejected) {
        if (process.env.NODE_ENV !== "production") {
          if (!("from" in this._opts)) {
            warnOnce(
              "Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning."
            );
          }
        }
        return this.async().then(onFulfilled, onRejected);
      }
      catch(onRejected) {
        return this.async().catch(onRejected);
      }
      finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      }
      async() {
        if (this.error)
          return Promise.reject(this.error);
        return Promise.resolve(this.result);
      }
      sync() {
        if (this.error)
          throw this.error;
        return this.result;
      }
    };
    module2.exports = NoWorkResult;
    NoWorkResult.default = NoWorkResult;
  }
});

// node_modules/postcss/lib/processor.js
var require_processor = __commonJS({
  "node_modules/postcss/lib/processor.js"(exports, module2) {
    "use strict";
    var NoWorkResult = require_no_work_result();
    var LazyResult = require_lazy_result();
    var Document2 = require_document();
    var Root2 = require_root();
    var Processor2 = class {
      constructor(plugins = []) {
        this.version = "8.4.20";
        this.plugins = this.normalize(plugins);
      }
      use(plugin2) {
        this.plugins = this.plugins.concat(this.normalize([plugin2]));
        return this;
      }
      process(css, opts = {}) {
        if (this.plugins.length === 0 && typeof opts.parser === "undefined" && typeof opts.stringifier === "undefined" && typeof opts.syntax === "undefined") {
          return new NoWorkResult(this, css, opts);
        } else {
          return new LazyResult(this, css, opts);
        }
      }
      normalize(plugins) {
        let normalized = [];
        for (let i of plugins) {
          if (i.postcss === true) {
            i = i();
          } else if (i.postcss) {
            i = i.postcss;
          }
          if (typeof i === "object" && Array.isArray(i.plugins)) {
            normalized = normalized.concat(i.plugins);
          } else if (typeof i === "object" && i.postcssPlugin) {
            normalized.push(i);
          } else if (typeof i === "function") {
            normalized.push(i);
          } else if (typeof i === "object" && (i.parse || i.stringify)) {
            if (process.env.NODE_ENV !== "production") {
              throw new Error(
                "PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation."
              );
            }
          } else {
            throw new Error(i + " is not a PostCSS plugin");
          }
        }
        return normalized;
      }
    };
    module2.exports = Processor2;
    Processor2.default = Processor2;
    Root2.registerProcessor(Processor2);
    Document2.registerProcessor(Processor2);
  }
});

// node_modules/postcss/lib/fromJSON.js
var require_fromJSON = __commonJS({
  "node_modules/postcss/lib/fromJSON.js"(exports, module2) {
    "use strict";
    var Declaration2 = require_declaration();
    var PreviousMap = require_previous_map();
    var Comment2 = require_comment();
    var AtRule2 = require_at_rule();
    var Input2 = require_input();
    var Root2 = require_root();
    var Rule2 = require_rule();
    function fromJSON2(json, inputs) {
      if (Array.isArray(json))
        return json.map((n) => fromJSON2(n));
      let { inputs: ownInputs, ...defaults } = json;
      if (ownInputs) {
        inputs = [];
        for (let input of ownInputs) {
          let inputHydrated = { ...input, __proto__: Input2.prototype };
          if (inputHydrated.map) {
            inputHydrated.map = {
              ...inputHydrated.map,
              __proto__: PreviousMap.prototype
            };
          }
          inputs.push(inputHydrated);
        }
      }
      if (defaults.nodes) {
        defaults.nodes = json.nodes.map((n) => fromJSON2(n, inputs));
      }
      if (defaults.source) {
        let { inputId, ...source } = defaults.source;
        defaults.source = source;
        if (inputId != null) {
          defaults.source.input = inputs[inputId];
        }
      }
      if (defaults.type === "root") {
        return new Root2(defaults);
      } else if (defaults.type === "decl") {
        return new Declaration2(defaults);
      } else if (defaults.type === "rule") {
        return new Rule2(defaults);
      } else if (defaults.type === "comment") {
        return new Comment2(defaults);
      } else if (defaults.type === "atrule") {
        return new AtRule2(defaults);
      } else {
        throw new Error("Unknown node type: " + json.type);
      }
    }
    module2.exports = fromJSON2;
    fromJSON2.default = fromJSON2;
  }
});

// node_modules/postcss/lib/postcss.js
var require_postcss = __commonJS({
  "node_modules/postcss/lib/postcss.js"(exports, module2) {
    "use strict";
    var CssSyntaxError2 = require_css_syntax_error();
    var Declaration2 = require_declaration();
    var LazyResult = require_lazy_result();
    var Container2 = require_container();
    var Processor2 = require_processor();
    var stringify2 = require_stringify();
    var fromJSON2 = require_fromJSON();
    var Document2 = require_document();
    var Warning2 = require_warning();
    var Comment2 = require_comment();
    var AtRule2 = require_at_rule();
    var Result3 = require_result();
    var Input2 = require_input();
    var parse2 = require_parse();
    var list2 = require_list();
    var Rule2 = require_rule();
    var Root2 = require_root();
    var Node3 = require_node();
    function postcss2(...plugins) {
      if (plugins.length === 1 && Array.isArray(plugins[0])) {
        plugins = plugins[0];
      }
      return new Processor2(plugins);
    }
    postcss2.plugin = function plugin2(name, initializer) {
      let warningPrinted = false;
      function creator(...args) {
        if (console && console.warn && !warningPrinted) {
          warningPrinted = true;
          console.warn(
            name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"
          );
          if (process.env.LANG && process.env.LANG.startsWith("cn")) {
            console.warn(
              name + ": \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:\nhttps://www.w3ctech.com/topic/2226"
            );
          }
        }
        let transformer = initializer(...args);
        transformer.postcssPlugin = name;
        transformer.postcssVersion = new Processor2().version;
        return transformer;
      }
      let cache;
      Object.defineProperty(creator, "postcss", {
        get() {
          if (!cache)
            cache = creator();
          return cache;
        }
      });
      creator.process = function(css, processOpts, pluginOpts) {
        return postcss2([creator(pluginOpts)]).process(css, processOpts);
      };
      return creator;
    };
    postcss2.stringify = stringify2;
    postcss2.parse = parse2;
    postcss2.fromJSON = fromJSON2;
    postcss2.list = list2;
    postcss2.comment = (defaults) => new Comment2(defaults);
    postcss2.atRule = (defaults) => new AtRule2(defaults);
    postcss2.decl = (defaults) => new Declaration2(defaults);
    postcss2.rule = (defaults) => new Rule2(defaults);
    postcss2.root = (defaults) => new Root2(defaults);
    postcss2.document = (defaults) => new Document2(defaults);
    postcss2.CssSyntaxError = CssSyntaxError2;
    postcss2.Declaration = Declaration2;
    postcss2.Container = Container2;
    postcss2.Processor = Processor2;
    postcss2.Document = Document2;
    postcss2.Comment = Comment2;
    postcss2.Warning = Warning2;
    postcss2.AtRule = AtRule2;
    postcss2.Result = Result3;
    postcss2.Input = Input2;
    postcss2.Rule = Rule2;
    postcss2.Root = Root2;
    postcss2.Node = Node3;
    LazyResult.registerPostcss(postcss2);
    module2.exports = postcss2;
    postcss2.default = postcss2;
  }
});

// node_modules/postcss-at-rules-variables/lib/index.js
var require_lib = __commonJS({
  "node_modules/postcss-at-rules-variables/lib/index.js"(exports, module2) {
    "use strict";
    function hasVar(string) {
      return string.includes("var(");
    }
    function resolveValue(value, maps) {
      return hasVar(value) ? value.replace(/var\(--.*?\)/g, (match) => maps[match.slice(4, -1)] || match) : value;
    }
    function circularReference(maps) {
      return Object.keys(maps).reduce((previousMaps, property) => (previousMaps[property] = resolveValue(maps[property], maps), previousMaps), maps);
    }
    function getProperty(nodes) {
      let propertys = {};
      return nodes.walkRules((rule2) => {
        ":root" !== rule2.selector || rule2.each(({ type, prop: property, value }) => {
          "decl" === type && (propertys[property] = value);
        });
      }), propertys;
    }
    module2.exports = (options = {}) => {
      var _options$declarationB;
      return options = { atRules: [.../* @__PURE__ */ new Set(["for", "if", "else", "each", "mixin", "custom-media", ...options.atRules || ""])], variables: { ...options.variables }, declarationByWalk: null !== (_options$declarationB = options.declarationByWalk) && void 0 !== _options$declarationB && _options$declarationB }, { postcssPlugin: "postcss-at-rules-variables", prepare() {
        let variables = {};
        return { Declaration(node) {
          node.variable && (variables[node.prop] = node.value);
        }, Once(root2) {
          let declarativeVariables = variables;
          options.declarationByWalk && (declarativeVariables = getProperty(root2)), variables = circularReference(Object.assign(declarativeVariables, options.variables));
        }, AtRule(rule2) {
          options.atRules.includes(rule2.name) && (rule2.params = resolveValue(rule2.params, variables));
        } };
      } };
    }, module2.exports.postcss = true;
  }
});

// node_modules/postcss-import/lib/join-media.js
var require_join_media = __commonJS({
  "node_modules/postcss-import/lib/join-media.js"(exports, module2) {
    "use strict";
    var startsWithKeywordRegexp = /^(all|not|only|print|screen)/i;
    module2.exports = function(parentMedia, childMedia) {
      if (!parentMedia.length && childMedia.length)
        return childMedia;
      if (parentMedia.length && !childMedia.length)
        return parentMedia;
      if (!parentMedia.length && !childMedia.length)
        return [];
      const media = [];
      parentMedia.forEach((parentItem) => {
        const parentItemStartsWithKeyword = startsWithKeywordRegexp.test(parentItem);
        childMedia.forEach((childItem) => {
          const childItemStartsWithKeyword = startsWithKeywordRegexp.test(childItem);
          if (parentItem !== childItem) {
            if (childItemStartsWithKeyword && !parentItemStartsWithKeyword) {
              media.push(`${childItem} and ${parentItem}`);
            } else {
              media.push(`${parentItem} and ${childItem}`);
            }
          }
        });
      });
      return media;
    };
  }
});

// node_modules/postcss-import/lib/join-layer.js
var require_join_layer = __commonJS({
  "node_modules/postcss-import/lib/join-layer.js"(exports, module2) {
    "use strict";
    module2.exports = function(parentLayer, childLayer) {
      if (!parentLayer.length && childLayer.length)
        return childLayer;
      if (parentLayer.length && !childLayer.length)
        return parentLayer;
      if (!parentLayer.length && !childLayer.length)
        return [];
      return parentLayer.concat(childLayer);
    };
  }
});

// node_modules/resolve/lib/homedir.js
var require_homedir = __commonJS({
  "node_modules/resolve/lib/homedir.js"(exports, module2) {
    "use strict";
    var os = require("os");
    module2.exports = os.homedir || function homedir() {
      var home = process.env.HOME;
      var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
      if (process.platform === "win32") {
        return process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null;
      }
      if (process.platform === "darwin") {
        return home || (user ? "/Users/" + user : null);
      }
      if (process.platform === "linux") {
        return home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null);
      }
      return home || null;
    };
  }
});

// node_modules/resolve/lib/caller.js
var require_caller = __commonJS({
  "node_modules/resolve/lib/caller.js"(exports, module2) {
    module2.exports = function() {
      var origPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = origPrepareStackTrace;
      return stack[2].getFileName();
    };
  }
});

// node_modules/path-parse/index.js
var require_path_parse = __commonJS({
  "node_modules/path-parse/index.js"(exports, module2) {
    "use strict";
    var isWindows = process.platform === "win32";
    var splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/;
    var win32 = {};
    function win32SplitPath(filename) {
      return splitWindowsRe.exec(filename).slice(1);
    }
    win32.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = win32SplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/;
    var posix = {};
    function posixSplitPath(filename) {
      return splitPathRe.exec(filename).slice(1);
    }
    posix.parse = function(pathString) {
      if (typeof pathString !== "string") {
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      }
      var allParts = posixSplitPath(pathString);
      if (!allParts || allParts.length !== 5) {
        throw new TypeError("Invalid path '" + pathString + "'");
      }
      return {
        root: allParts[1],
        dir: allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    if (isWindows)
      module2.exports = win32.parse;
    else
      module2.exports = posix.parse;
    module2.exports.posix = posix.parse;
    module2.exports.win32 = win32.parse;
  }
});

// node_modules/resolve/lib/node-modules-paths.js
var require_node_modules_paths = __commonJS({
  "node_modules/resolve/lib/node-modules-paths.js"(exports, module2) {
    var path3 = require("path");
    var parse2 = path3.parse || require_path_parse();
    var getNodeModulesDirs = function getNodeModulesDirs2(absoluteStart, modules) {
      var prefix = "/";
      if (/^([A-Za-z]:)/.test(absoluteStart)) {
        prefix = "";
      } else if (/^\\\\/.test(absoluteStart)) {
        prefix = "\\\\";
      }
      var paths = [absoluteStart];
      var parsed = parse2(absoluteStart);
      while (parsed.dir !== paths[paths.length - 1]) {
        paths.push(parsed.dir);
        parsed = parse2(parsed.dir);
      }
      return paths.reduce(function(dirs, aPath) {
        return dirs.concat(modules.map(function(moduleDir) {
          return path3.resolve(prefix, aPath, moduleDir);
        }));
      }, []);
    };
    module2.exports = function nodeModulesPaths(start, opts, request) {
      var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : ["node_modules"];
      if (opts && typeof opts.paths === "function") {
        return opts.paths(
          request,
          start,
          function() {
            return getNodeModulesDirs(start, modules);
          },
          opts
        );
      }
      var dirs = getNodeModulesDirs(start, modules);
      return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
    };
  }
});

// node_modules/resolve/lib/normalize-options.js
var require_normalize_options = __commonJS({
  "node_modules/resolve/lib/normalize-options.js"(exports, module2) {
    module2.exports = function(x, opts) {
      return opts || {};
    };
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports, module2) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var slice = Array.prototype.slice;
    var toStr = Object.prototype.toString;
    var funcType = "[object Function]";
    module2.exports = function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slice.call(arguments, 1);
      var bound;
      var binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            args.concat(slice.call(arguments))
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        } else {
          return target.apply(
            that,
            args.concat(slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = function Empty2() {
        };
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    };
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports, module2) {
    "use strict";
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/has/src/index.js
var require_src = __commonJS({
  "node_modules/has/src/index.js"(exports, module2) {
    "use strict";
    var bind = require_function_bind();
    module2.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
  }
});

// node_modules/is-core-module/core.json
var require_core = __commonJS({
  "node_modules/is-core-module/core.json"(exports, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: ">= 13.4 && < 13.5",
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/is-core-module/index.js
var require_is_core_module = __commonJS({
  "node_modules/is-core-module/index.js"(exports, module2) {
    "use strict";
    var has = require_src();
    function specifierIncluded(current, specifier) {
      var nodeParts = current.split(".");
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(nodeParts[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        }
        if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(current, range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(current, specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(nodeVersion, specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      var current = typeof nodeVersion === "undefined" ? process.versions && process.versions.node : nodeVersion;
      if (typeof current !== "string") {
        throw new TypeError(typeof nodeVersion === "undefined" ? "Unable to determine current node version" : "If provided, a valid node version is required");
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(current, specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(current, specifierValue);
    }
    var data = require_core();
    module2.exports = function isCore(x, nodeVersion) {
      return has(data, x) && versionIncluded(nodeVersion, data[x]);
    };
  }
});

// node_modules/resolve/lib/async.js
var require_async = __commonJS({
  "node_modules/resolve/lib/async.js"(exports, module2) {
    var fs3 = require("fs");
    var getHomedir = require_homedir();
    var path3 = require("path");
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var isCore = require_is_core_module();
    var realpathFS = process.platform !== "win32" && fs3.realpath && typeof fs3.realpath.native === "function" ? fs3.realpath.native : fs3.realpath;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path3.join(homedir, ".node_modules"),
        path3.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file, cb) {
      fs3.stat(file, function(err, stat) {
        if (!err) {
          return cb(null, stat.isFile() || stat.isFIFO());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR")
          return cb(null, false);
        return cb(err);
      });
    };
    var defaultIsDir = function isDirectory(dir, cb) {
      fs3.stat(dir, function(err, stat) {
        if (!err) {
          return cb(null, stat.isDirectory());
        }
        if (err.code === "ENOENT" || err.code === "ENOTDIR")
          return cb(null, false);
        return cb(err);
      });
    };
    var defaultRealpath = function realpath(x, cb) {
      realpathFS(x, function(realpathErr, realPath) {
        if (realpathErr && realpathErr.code !== "ENOENT")
          cb(realpathErr);
        else
          cb(null, realpathErr ? x : realPath);
      });
    };
    var maybeRealpath = function maybeRealpath2(realpath, x, opts, cb) {
      if (opts && opts.preserveSymlinks === false) {
        realpath(x, cb);
      } else {
        cb(null, x);
      }
    };
    var defaultReadPackage = function defaultReadPackage2(readFile, pkgfile, cb) {
      readFile(pkgfile, function(readFileErr, body) {
        if (readFileErr)
          cb(readFileErr);
        else {
          try {
            var pkg = JSON.parse(body);
            cb(null, pkg);
          } catch (jsonErr) {
            cb(null);
          }
        }
      });
    };
    var getPackageCandidates = function getPackageCandidates2(x, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path3.join(dirs[i], x);
      }
      return dirs;
    };
    module2.exports = function resolve(x, options, callback) {
      var cb = callback;
      var opts = options;
      if (typeof options === "function") {
        cb = opts;
        opts = {};
      }
      if (typeof x !== "string") {
        var err = new TypeError("Path must be a string.");
        return process.nextTick(function() {
          cb(err);
        });
      }
      opts = normalizeOptions(x, opts);
      var isFile = opts.isFile || defaultIsFile;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var readFile = opts.readFile || fs3.readFile;
      var realpath = opts.realpath || defaultRealpath;
      var readPackage = opts.readPackage || defaultReadPackage;
      if (opts.readFile && opts.readPackage) {
        var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
        return process.nextTick(function() {
          cb(conflictErr);
        });
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path3.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = path3.resolve(basedir);
      maybeRealpath(
        realpath,
        absoluteStart,
        opts,
        function(err2, realStart) {
          if (err2)
            cb(err2);
          else
            init(realStart);
        }
      );
      var res;
      function init(basedir2) {
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
          res = path3.resolve(basedir2, x);
          if (x === "." || x === ".." || x.slice(-1) === "/")
            res += "/";
          if (/\/$/.test(x) && res === basedir2) {
            loadAsDirectory(res, opts.package, onfile);
          } else
            loadAsFile(res, opts.package, onfile);
        } else if (includeCoreModules && isCore(x)) {
          return cb(null, x);
        } else
          loadNodeModules(x, basedir2, function(err2, n, pkg) {
            if (err2)
              cb(err2);
            else if (n) {
              return maybeRealpath(realpath, n, opts, function(err3, realN) {
                if (err3) {
                  cb(err3);
                } else {
                  cb(null, realN, pkg);
                }
              });
            } else {
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND";
              cb(moduleError);
            }
          });
      }
      function onfile(err2, m, pkg) {
        if (err2)
          cb(err2);
        else if (m)
          cb(null, m, pkg);
        else
          loadAsDirectory(res, function(err3, d, pkg2) {
            if (err3)
              cb(err3);
            else if (d) {
              maybeRealpath(realpath, d, opts, function(err4, realD) {
                if (err4) {
                  cb(err4);
                } else {
                  cb(null, realD, pkg2);
                }
              });
            } else {
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND";
              cb(moduleError);
            }
          });
      }
      function loadAsFile(x2, thePackage, callback2) {
        var loadAsFilePackage = thePackage;
        var cb2 = callback2;
        if (typeof loadAsFilePackage === "function") {
          cb2 = loadAsFilePackage;
          loadAsFilePackage = void 0;
        }
        var exts = [""].concat(extensions);
        load(exts, x2, loadAsFilePackage);
        function load(exts2, x3, loadPackage) {
          if (exts2.length === 0)
            return cb2(null, void 0, loadPackage);
          var file = x3 + exts2[0];
          var pkg = loadPackage;
          if (pkg)
            onpkg(null, pkg);
          else
            loadpkg(path3.dirname(file), onpkg);
          function onpkg(err2, pkg_, dir) {
            pkg = pkg_;
            if (err2)
              return cb2(err2);
            if (dir && pkg && opts.pathFilter) {
              var rfile = path3.relative(dir, file);
              var rel = rfile.slice(0, rfile.length - exts2[0].length);
              var r = opts.pathFilter(pkg, x3, rel);
              if (r)
                return load(
                  [""].concat(extensions.slice()),
                  path3.resolve(dir, r),
                  pkg
                );
            }
            isFile(file, onex);
          }
          function onex(err2, ex) {
            if (err2)
              return cb2(err2);
            if (ex)
              return cb2(null, file, pkg);
            load(exts2.slice(1), x3, pkg);
          }
        }
      }
      function loadpkg(dir, cb2) {
        if (dir === "" || dir === "/")
          return cb2(null);
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return cb2(null);
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir))
          return cb2(null);
        maybeRealpath(realpath, dir, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr)
            return loadpkg(path3.dirname(dir), cb2);
          var pkgfile = path3.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (!ex)
              return loadpkg(path3.dirname(dir), cb2);
            readPackage(readFile, pkgfile, function(err3, pkgParam) {
              if (err3)
                cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              cb2(null, pkg, dir);
            });
          });
        });
      }
      function loadAsDirectory(x2, loadAsDirectoryPackage, callback2) {
        var cb2 = callback2;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === "function") {
          cb2 = fpkg;
          fpkg = opts.package;
        }
        maybeRealpath(realpath, x2, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr)
            return cb2(unwrapErr);
          var pkgfile = path3.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (err2)
              return cb2(err2);
            if (!ex)
              return loadAsFile(path3.join(x2, "index"), fpkg, cb2);
            readPackage(readFile, pkgfile, function(err3, pkgParam) {
              if (err3)
                return cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter) {
                pkg = opts.packageFilter(pkg, pkgfile);
              }
              if (pkg && pkg.main) {
                if (typeof pkg.main !== "string") {
                  var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
                  mainError.code = "INVALID_PACKAGE_MAIN";
                  return cb2(mainError);
                }
                if (pkg.main === "." || pkg.main === "./") {
                  pkg.main = "index";
                }
                loadAsFile(path3.resolve(x2, pkg.main), pkg, function(err4, m, pkg2) {
                  if (err4)
                    return cb2(err4);
                  if (m)
                    return cb2(null, m, pkg2);
                  if (!pkg2)
                    return loadAsFile(path3.join(x2, "index"), pkg2, cb2);
                  var dir = path3.resolve(x2, pkg2.main);
                  loadAsDirectory(dir, pkg2, function(err5, n, pkg3) {
                    if (err5)
                      return cb2(err5);
                    if (n)
                      return cb2(null, n, pkg3);
                    loadAsFile(path3.join(x2, "index"), pkg3, cb2);
                  });
                });
                return;
              }
              loadAsFile(path3.join(x2, "/index"), pkg, cb2);
            });
          });
        });
      }
      function processDirs(cb2, dirs) {
        if (dirs.length === 0)
          return cb2(null, void 0);
        var dir = dirs[0];
        isDirectory(path3.dirname(dir), isdir);
        function isdir(err2, isdir2) {
          if (err2)
            return cb2(err2);
          if (!isdir2)
            return processDirs(cb2, dirs.slice(1));
          loadAsFile(dir, opts.package, onfile2);
        }
        function onfile2(err2, m, pkg) {
          if (err2)
            return cb2(err2);
          if (m)
            return cb2(null, m, pkg);
          loadAsDirectory(dir, opts.package, ondir);
        }
        function ondir(err2, n, pkg) {
          if (err2)
            return cb2(err2);
          if (n)
            return cb2(null, n, pkg);
          processDirs(cb2, dirs.slice(1));
        }
      }
      function loadNodeModules(x2, start, cb2) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        processDirs(
          cb2,
          packageIterator ? packageIterator(x2, start, thunk, opts) : thunk()
        );
      }
    };
  }
});

// node_modules/resolve/lib/core.json
var require_core2 = __commonJS({
  "node_modules/resolve/lib/core.json"(exports, module2) {
    module2.exports = {
      assert: true,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: true,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: true,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: true,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: true,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: true,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: true,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: true,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: true,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: true,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: true,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: true,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      _linklist: "< 8",
      module: true,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: true,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: true,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: true,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: true,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: true,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: true,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      smalloc: ">= 0.11.5 && < 3",
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: true,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: true,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "node:test": ">= 18",
      timers: true,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: true,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: true,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: true,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: true,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: true,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: ">= 13.4 && < 13.5",
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// node_modules/resolve/lib/core.js
var require_core3 = __commonJS({
  "node_modules/resolve/lib/core.js"(exports, module2) {
    var current = process.versions && process.versions.node && process.versions.node.split(".") || [];
    function specifierIncluded(specifier) {
      var parts = specifier.split(" ");
      var op = parts.length > 1 ? parts[0] : "=";
      var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split(".");
      for (var i = 0; i < 3; ++i) {
        var cur = parseInt(current[i] || 0, 10);
        var ver = parseInt(versionParts[i] || 0, 10);
        if (cur === ver) {
          continue;
        }
        if (op === "<") {
          return cur < ver;
        } else if (op === ">=") {
          return cur >= ver;
        }
        return false;
      }
      return op === ">=";
    }
    function matchesRange(range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0) {
        return false;
      }
      for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(specifiers[i])) {
          return false;
        }
      }
      return true;
    }
    function versionIncluded(specifierValue) {
      if (typeof specifierValue === "boolean") {
        return specifierValue;
      }
      if (specifierValue && typeof specifierValue === "object") {
        for (var i = 0; i < specifierValue.length; ++i) {
          if (matchesRange(specifierValue[i])) {
            return true;
          }
        }
        return false;
      }
      return matchesRange(specifierValue);
    }
    var data = require_core2();
    var core = {};
    for (mod in data) {
      if (Object.prototype.hasOwnProperty.call(data, mod)) {
        core[mod] = versionIncluded(data[mod]);
      }
    }
    var mod;
    module2.exports = core;
  }
});

// node_modules/resolve/lib/is-core.js
var require_is_core = __commonJS({
  "node_modules/resolve/lib/is-core.js"(exports, module2) {
    var isCoreModule = require_is_core_module();
    module2.exports = function isCore(x) {
      return isCoreModule(x);
    };
  }
});

// node_modules/resolve/lib/sync.js
var require_sync = __commonJS({
  "node_modules/resolve/lib/sync.js"(exports, module2) {
    var isCore = require_is_core_module();
    var fs3 = require("fs");
    var path3 = require("path");
    var getHomedir = require_homedir();
    var caller = require_caller();
    var nodeModulesPaths = require_node_modules_paths();
    var normalizeOptions = require_normalize_options();
    var realpathFS = process.platform !== "win32" && fs3.realpathSync && typeof fs3.realpathSync.native === "function" ? fs3.realpathSync.native : fs3.realpathSync;
    var homedir = getHomedir();
    var defaultPaths = function() {
      return [
        path3.join(homedir, ".node_modules"),
        path3.join(homedir, ".node_libraries")
      ];
    };
    var defaultIsFile = function isFile(file) {
      try {
        var stat = fs3.statSync(file, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR"))
          return false;
        throw e;
      }
      return !!stat && (stat.isFile() || stat.isFIFO());
    };
    var defaultIsDir = function isDirectory(dir) {
      try {
        var stat = fs3.statSync(dir, { throwIfNoEntry: false });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR"))
          return false;
        throw e;
      }
      return !!stat && stat.isDirectory();
    };
    var defaultRealpathSync = function realpathSync(x) {
      try {
        return realpathFS(x);
      } catch (realpathErr) {
        if (realpathErr.code !== "ENOENT") {
          throw realpathErr;
        }
      }
      return x;
    };
    var maybeRealpathSync = function maybeRealpathSync2(realpathSync, x, opts) {
      if (opts && opts.preserveSymlinks === false) {
        return realpathSync(x);
      }
      return x;
    };
    var defaultReadPackageSync = function defaultReadPackageSync2(readFileSync, pkgfile) {
      var body = readFileSync(pkgfile);
      try {
        var pkg = JSON.parse(body);
        return pkg;
      } catch (jsonErr) {
      }
    };
    var getPackageCandidates = function getPackageCandidates2(x, start, opts) {
      var dirs = nodeModulesPaths(start, opts, x);
      for (var i = 0; i < dirs.length; i++) {
        dirs[i] = path3.join(dirs[i], x);
      }
      return dirs;
    };
    module2.exports = function resolveSync(x, options) {
      if (typeof x !== "string") {
        throw new TypeError("Path must be a string.");
      }
      var opts = normalizeOptions(x, options);
      var isFile = opts.isFile || defaultIsFile;
      var readFileSync = opts.readFileSync || fs3.readFileSync;
      var isDirectory = opts.isDirectory || defaultIsDir;
      var realpathSync = opts.realpathSync || defaultRealpathSync;
      var readPackageSync = opts.readPackageSync || defaultReadPackageSync;
      if (opts.readFileSync && opts.readPackageSync) {
        throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
      }
      var packageIterator = opts.packageIterator;
      var extensions = opts.extensions || [".js"];
      var includeCoreModules = opts.includeCoreModules !== false;
      var basedir = opts.basedir || path3.dirname(caller());
      var parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = maybeRealpathSync(realpathSync, path3.resolve(basedir), opts);
      if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
        var res = path3.resolve(absoluteStart, x);
        if (x === "." || x === ".." || x.slice(-1) === "/")
          res += "/";
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m)
          return maybeRealpathSync(realpathSync, m, opts);
      } else if (includeCoreModules && isCore(x)) {
        return x;
      } else {
        var n = loadNodeModulesSync(x, absoluteStart);
        if (n)
          return maybeRealpathSync(realpathSync, n, opts);
      }
      var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
      err.code = "MODULE_NOT_FOUND";
      throw err;
      function loadAsFileSync(x2) {
        var pkg = loadpkg(path3.dirname(x2));
        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
          var rfile = path3.relative(pkg.dir, x2);
          var r = opts.pathFilter(pkg.pkg, x2, rfile);
          if (r) {
            x2 = path3.resolve(pkg.dir, r);
          }
        }
        if (isFile(x2)) {
          return x2;
        }
        for (var i = 0; i < extensions.length; i++) {
          var file = x2 + extensions[i];
          if (isFile(file)) {
            return file;
          }
        }
      }
      function loadpkg(dir) {
        if (dir === "" || dir === "/")
          return;
        if (process.platform === "win32" && /^\w:[/\\]*$/.test(dir)) {
          return;
        }
        if (/[/\\]node_modules[/\\]*$/.test(dir))
          return;
        var pkgfile = path3.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
        if (!isFile(pkgfile)) {
          return loadpkg(path3.dirname(dir));
        }
        var pkg = readPackageSync(readFileSync, pkgfile);
        if (pkg && opts.packageFilter) {
          pkg = opts.packageFilter(pkg, dir);
        }
        return { pkg, dir };
      }
      function loadAsDirectorySync(x2) {
        var pkgfile = path3.join(maybeRealpathSync(realpathSync, x2, opts), "/package.json");
        if (isFile(pkgfile)) {
          try {
            var pkg = readPackageSync(readFileSync, pkgfile);
          } catch (e) {
          }
          if (pkg && opts.packageFilter) {
            pkg = opts.packageFilter(pkg, x2);
          }
          if (pkg && pkg.main) {
            if (typeof pkg.main !== "string") {
              var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
              mainError.code = "INVALID_PACKAGE_MAIN";
              throw mainError;
            }
            if (pkg.main === "." || pkg.main === "./") {
              pkg.main = "index";
            }
            try {
              var m2 = loadAsFileSync(path3.resolve(x2, pkg.main));
              if (m2)
                return m2;
              var n2 = loadAsDirectorySync(path3.resolve(x2, pkg.main));
              if (n2)
                return n2;
            } catch (e) {
            }
          }
        }
        return loadAsFileSync(path3.join(x2, "/index"));
      }
      function loadNodeModulesSync(x2, start) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        var dirs = packageIterator ? packageIterator(x2, start, thunk, opts) : thunk();
        for (var i = 0; i < dirs.length; i++) {
          var dir = dirs[i];
          if (isDirectory(path3.dirname(dir))) {
            var m2 = loadAsFileSync(dir);
            if (m2)
              return m2;
            var n2 = loadAsDirectorySync(dir);
            if (n2)
              return n2;
          }
        }
      }
    };
  }
});

// node_modules/resolve/index.js
var require_resolve = __commonJS({
  "node_modules/resolve/index.js"(exports, module2) {
    var async = require_async();
    async.core = require_core3();
    async.isCore = require_is_core();
    async.sync = require_sync();
    module2.exports = async;
  }
});

// node_modules/postcss-import/lib/resolve-id.js
var require_resolve_id = __commonJS({
  "node_modules/postcss-import/lib/resolve-id.js"(exports, module2) {
    "use strict";
    var resolve = require_resolve();
    var moduleDirectories = ["web_modules", "node_modules"];
    function resolveModule(id, opts) {
      return new Promise((res, rej) => {
        resolve(id, opts, (err, path3) => err ? rej(err) : res(path3));
      });
    }
    module2.exports = function(id, base, options) {
      const paths = options.path;
      const resolveOpts = {
        basedir: base,
        moduleDirectory: moduleDirectories.concat(options.addModulesDirectories),
        paths,
        extensions: [".css"],
        packageFilter: function processPackage(pkg) {
          if (pkg.style)
            pkg.main = pkg.style;
          else if (!pkg.main || !/\.css$/.test(pkg.main))
            pkg.main = "index.css";
          return pkg;
        },
        preserveSymlinks: false
      };
      return resolveModule(`./${id}`, resolveOpts).catch(() => resolveModule(id, resolveOpts)).catch(() => {
        if (paths.indexOf(base) === -1)
          paths.unshift(base);
        throw new Error(
          `Failed to find '${id}'
  in [
    ${paths.join(",\n        ")}
  ]`
        );
      });
    };
  }
});

// node_modules/pify/index.js
var require_pify = __commonJS({
  "node_modules/pify/index.js"(exports, module2) {
    "use strict";
    var processFn = function(fn, P, opts) {
      return function() {
        var that = this;
        var args = new Array(arguments.length);
        for (var i = 0; i < arguments.length; i++) {
          args[i] = arguments[i];
        }
        return new P(function(resolve, reject) {
          args.push(function(err, result) {
            if (err) {
              reject(err);
            } else if (opts.multiArgs) {
              var results = new Array(arguments.length - 1);
              for (var i2 = 1; i2 < arguments.length; i2++) {
                results[i2 - 1] = arguments[i2];
              }
              resolve(results);
            } else {
              resolve(result);
            }
          });
          fn.apply(that, args);
        });
      };
    };
    var pify = module2.exports = function(obj, P, opts) {
      if (typeof P !== "function") {
        opts = P;
        P = Promise;
      }
      opts = opts || {};
      opts.exclude = opts.exclude || [/.+Sync$/];
      var filter = function(key) {
        var match = function(pattern) {
          return typeof pattern === "string" ? key === pattern : pattern.test(key);
        };
        return opts.include ? opts.include.some(match) : !opts.exclude.some(match);
      };
      var ret = typeof obj === "function" ? function() {
        if (opts.excludeMain) {
          return obj.apply(this, arguments);
        }
        return processFn(obj, P, opts).apply(this, arguments);
      } : {};
      return Object.keys(obj).reduce(function(ret2, key) {
        var x = obj[key];
        ret2[key] = typeof x === "function" && filter(key) ? processFn(x, P, opts) : x;
        return ret2;
      }, ret);
    };
    pify.all = pify;
  }
});

// node_modules/read-cache/index.js
var require_read_cache = __commonJS({
  "node_modules/read-cache/index.js"(exports, module2) {
    var fs3 = require("fs");
    var path3 = require("path");
    var pify = require_pify();
    var stat = pify(fs3.stat);
    var readFile = pify(fs3.readFile);
    var resolve = path3.resolve;
    var cache = /* @__PURE__ */ Object.create(null);
    function convert(content, encoding) {
      if (Buffer.isEncoding(encoding)) {
        return content.toString(encoding);
      }
      return content;
    }
    module2.exports = function(path4, encoding) {
      path4 = resolve(path4);
      return stat(path4).then(function(stats) {
        var item = cache[path4];
        if (item && item.mtime.getTime() === stats.mtime.getTime()) {
          return convert(item.content, encoding);
        }
        return readFile(path4).then(function(data) {
          cache[path4] = {
            mtime: stats.mtime,
            content: data
          };
          return convert(data, encoding);
        });
      }).catch(function(err) {
        cache[path4] = null;
        return Promise.reject(err);
      });
    };
    module2.exports.sync = function(path4, encoding) {
      path4 = resolve(path4);
      try {
        var stats = fs3.statSync(path4);
        var item = cache[path4];
        if (item && item.mtime.getTime() === stats.mtime.getTime()) {
          return convert(item.content, encoding);
        }
        var data = fs3.readFileSync(path4);
        cache[path4] = {
          mtime: stats.mtime,
          content: data
        };
        return convert(data, encoding);
      } catch (err) {
        cache[path4] = null;
        throw err;
      }
    };
    module2.exports.get = function(path4, encoding) {
      path4 = resolve(path4);
      if (cache[path4]) {
        return convert(cache[path4].content, encoding);
      }
      return null;
    };
    module2.exports.clear = function() {
      cache = /* @__PURE__ */ Object.create(null);
    };
  }
});

// node_modules/postcss-import/lib/data-url.js
var require_data_url = __commonJS({
  "node_modules/postcss-import/lib/data-url.js"(exports, module2) {
    "use strict";
    var dataURLRegexp = /^data:text\/css;base64,/i;
    function isValid(url) {
      return dataURLRegexp.test(url);
    }
    function contents(url) {
      return Buffer.from(url.slice(21), "base64").toString();
    }
    module2.exports = {
      isValid,
      contents
    };
  }
});

// node_modules/postcss-import/lib/load-content.js
var require_load_content = __commonJS({
  "node_modules/postcss-import/lib/load-content.js"(exports, module2) {
    "use strict";
    var readCache = require_read_cache();
    var dataURL = require_data_url();
    module2.exports = (filename) => {
      if (dataURL.isValid(filename)) {
        return dataURL.contents(filename);
      }
      return readCache(filename, "utf-8");
    };
  }
});

// node_modules/postcss-import/lib/process-content.js
var require_process_content = __commonJS({
  "node_modules/postcss-import/lib/process-content.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    var sugarss;
    module2.exports = function processContent(result, content, filename, options, postcss2) {
      const { plugins } = options;
      const ext = path3.extname(filename);
      const parserList = [];
      if (ext === ".sss") {
        if (!sugarss) {
          try {
            sugarss = require("sugarss");
          } catch {
          }
        }
        if (sugarss)
          return runPostcss(postcss2, content, filename, plugins, [sugarss]);
      }
      if (result.opts.syntax?.parse) {
        parserList.push(result.opts.syntax.parse);
      }
      if (result.opts.parser)
        parserList.push(result.opts.parser);
      parserList.push(null);
      return runPostcss(postcss2, content, filename, plugins, parserList);
    };
    function runPostcss(postcss2, content, filename, plugins, parsers, index) {
      if (!index)
        index = 0;
      return postcss2(plugins).process(content, {
        from: filename,
        parser: parsers[index]
      }).catch((err) => {
        index++;
        if (index === parsers.length)
          throw err;
        return runPostcss(postcss2, content, filename, plugins, parsers, index);
      });
    }
  }
});

// node_modules/postcss-value-parser/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/postcss-value-parser/lib/parse.js"(exports, module2) {
    var openParentheses = "(".charCodeAt(0);
    var closeParentheses = ")".charCodeAt(0);
    var singleQuote = "'".charCodeAt(0);
    var doubleQuote = '"'.charCodeAt(0);
    var backslash = "\\".charCodeAt(0);
    var slash = "/".charCodeAt(0);
    var comma = ",".charCodeAt(0);
    var colon = ":".charCodeAt(0);
    var star = "*".charCodeAt(0);
    var uLower = "u".charCodeAt(0);
    var uUpper = "U".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var isUnicodeRange = /^[a-f0-9?-]+$/i;
    module2.exports = function(input) {
      var tokens = [];
      var value = input;
      var next, quote, prev, token, escape, escapePos, whitespacePos, parenthesesOpenPos;
      var pos = 0;
      var code = value.charCodeAt(pos);
      var max = value.length;
      var stack = [{ nodes: tokens }];
      var balanced = 0;
      var parent;
      var name = "";
      var before = "";
      var after = "";
      while (pos < max) {
        if (code <= 32) {
          next = pos;
          do {
            next += 1;
            code = value.charCodeAt(next);
          } while (code <= 32);
          token = value.slice(pos, next);
          prev = tokens[tokens.length - 1];
          if (code === closeParentheses && balanced) {
            after = token;
          } else if (prev && prev.type === "div") {
            prev.after = token;
            prev.sourceEndIndex += token.length;
          } else if (code === comma || code === colon || code === slash && value.charCodeAt(next + 1) !== star && (!parent || parent && parent.type === "function" && parent.value !== "calc")) {
            before = token;
          } else {
            tokens.push({
              type: "space",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          }
          pos = next;
        } else if (code === singleQuote || code === doubleQuote) {
          next = pos;
          quote = code === singleQuote ? "'" : '"';
          token = {
            type: "string",
            sourceIndex: pos,
            quote
          };
          do {
            escape = false;
            next = value.indexOf(quote, next + 1);
            if (~next) {
              escapePos = next;
              while (value.charCodeAt(escapePos - 1) === backslash) {
                escapePos -= 1;
                escape = !escape;
              }
            } else {
              value += quote;
              next = value.length - 1;
              token.unclosed = true;
            }
          } while (escape);
          token.value = value.slice(pos + 1, next);
          token.sourceEndIndex = token.unclosed ? next : next + 1;
          tokens.push(token);
          pos = next + 1;
          code = value.charCodeAt(pos);
        } else if (code === slash && value.charCodeAt(pos + 1) === star) {
          next = value.indexOf("*/", pos);
          token = {
            type: "comment",
            sourceIndex: pos,
            sourceEndIndex: next + 2
          };
          if (next === -1) {
            token.unclosed = true;
            next = value.length;
            token.sourceEndIndex = next;
          }
          token.value = value.slice(pos + 2, next);
          tokens.push(token);
          pos = next + 2;
          code = value.charCodeAt(pos);
        } else if ((code === slash || code === star) && parent && parent.type === "function" && parent.value === "calc") {
          token = value[pos];
          tokens.push({
            type: "word",
            sourceIndex: pos - before.length,
            sourceEndIndex: pos + token.length,
            value: token
          });
          pos += 1;
          code = value.charCodeAt(pos);
        } else if (code === slash || code === comma || code === colon) {
          token = value[pos];
          tokens.push({
            type: "div",
            sourceIndex: pos - before.length,
            sourceEndIndex: pos + token.length,
            value: token,
            before,
            after: ""
          });
          before = "";
          pos += 1;
          code = value.charCodeAt(pos);
        } else if (openParentheses === code) {
          next = pos;
          do {
            next += 1;
            code = value.charCodeAt(next);
          } while (code <= 32);
          parenthesesOpenPos = pos;
          token = {
            type: "function",
            sourceIndex: pos - name.length,
            value: name,
            before: value.slice(parenthesesOpenPos + 1, next)
          };
          pos = next;
          if (name === "url" && code !== singleQuote && code !== doubleQuote) {
            next -= 1;
            do {
              escape = false;
              next = value.indexOf(")", next + 1);
              if (~next) {
                escapePos = next;
                while (value.charCodeAt(escapePos - 1) === backslash) {
                  escapePos -= 1;
                  escape = !escape;
                }
              } else {
                value += ")";
                next = value.length - 1;
                token.unclosed = true;
              }
            } while (escape);
            whitespacePos = next;
            do {
              whitespacePos -= 1;
              code = value.charCodeAt(whitespacePos);
            } while (code <= 32);
            if (parenthesesOpenPos < whitespacePos) {
              if (pos !== whitespacePos + 1) {
                token.nodes = [
                  {
                    type: "word",
                    sourceIndex: pos,
                    sourceEndIndex: whitespacePos + 1,
                    value: value.slice(pos, whitespacePos + 1)
                  }
                ];
              } else {
                token.nodes = [];
              }
              if (token.unclosed && whitespacePos + 1 !== next) {
                token.after = "";
                token.nodes.push({
                  type: "space",
                  sourceIndex: whitespacePos + 1,
                  sourceEndIndex: next,
                  value: value.slice(whitespacePos + 1, next)
                });
              } else {
                token.after = value.slice(whitespacePos + 1, next);
                token.sourceEndIndex = next;
              }
            } else {
              token.after = "";
              token.nodes = [];
            }
            pos = next + 1;
            token.sourceEndIndex = token.unclosed ? next : pos;
            code = value.charCodeAt(pos);
            tokens.push(token);
          } else {
            balanced += 1;
            token.after = "";
            token.sourceEndIndex = pos + 1;
            tokens.push(token);
            stack.push(token);
            tokens = token.nodes = [];
            parent = token;
          }
          name = "";
        } else if (closeParentheses === code && balanced) {
          pos += 1;
          code = value.charCodeAt(pos);
          parent.after = after;
          parent.sourceEndIndex += after.length;
          after = "";
          balanced -= 1;
          stack[stack.length - 1].sourceEndIndex = pos;
          stack.pop();
          parent = stack[balanced];
          tokens = parent.nodes;
        } else {
          next = pos;
          do {
            if (code === backslash) {
              next += 1;
            }
            next += 1;
            code = value.charCodeAt(next);
          } while (next < max && !(code <= 32 || code === singleQuote || code === doubleQuote || code === comma || code === colon || code === slash || code === openParentheses || code === star && parent && parent.type === "function" && parent.value === "calc" || code === slash && parent.type === "function" && parent.value === "calc" || code === closeParentheses && balanced));
          token = value.slice(pos, next);
          if (openParentheses === code) {
            name = token;
          } else if ((uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) && plus === token.charCodeAt(1) && isUnicodeRange.test(token.slice(2))) {
            tokens.push({
              type: "unicode-range",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          } else {
            tokens.push({
              type: "word",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          }
          pos = next;
        }
      }
      for (pos = stack.length - 1; pos; pos -= 1) {
        stack[pos].unclosed = true;
        stack[pos].sourceEndIndex = value.length;
      }
      return stack[0].nodes;
    };
  }
});

// node_modules/postcss-value-parser/lib/walk.js
var require_walk = __commonJS({
  "node_modules/postcss-value-parser/lib/walk.js"(exports, module2) {
    module2.exports = function walk(nodes, cb, bubble) {
      var i, max, node, result;
      for (i = 0, max = nodes.length; i < max; i += 1) {
        node = nodes[i];
        if (!bubble) {
          result = cb(node, i, nodes);
        }
        if (result !== false && node.type === "function" && Array.isArray(node.nodes)) {
          walk(node.nodes, cb, bubble);
        }
        if (bubble) {
          cb(node, i, nodes);
        }
      }
    };
  }
});

// node_modules/postcss-value-parser/lib/stringify.js
var require_stringify2 = __commonJS({
  "node_modules/postcss-value-parser/lib/stringify.js"(exports, module2) {
    function stringifyNode(node, custom) {
      var type = node.type;
      var value = node.value;
      var buf;
      var customResult;
      if (custom && (customResult = custom(node)) !== void 0) {
        return customResult;
      } else if (type === "word" || type === "space") {
        return value;
      } else if (type === "string") {
        buf = node.quote || "";
        return buf + value + (node.unclosed ? "" : buf);
      } else if (type === "comment") {
        return "/*" + value + (node.unclosed ? "" : "*/");
      } else if (type === "div") {
        return (node.before || "") + value + (node.after || "");
      } else if (Array.isArray(node.nodes)) {
        buf = stringify2(node.nodes, custom);
        if (type !== "function") {
          return buf;
        }
        return value + "(" + (node.before || "") + buf + (node.after || "") + (node.unclosed ? "" : ")");
      }
      return value;
    }
    function stringify2(nodes, custom) {
      var result, i;
      if (Array.isArray(nodes)) {
        result = "";
        for (i = nodes.length - 1; ~i; i -= 1) {
          result = stringifyNode(nodes[i], custom) + result;
        }
        return result;
      }
      return stringifyNode(nodes, custom);
    }
    module2.exports = stringify2;
  }
});

// node_modules/postcss-value-parser/lib/unit.js
var require_unit = __commonJS({
  "node_modules/postcss-value-parser/lib/unit.js"(exports, module2) {
    var minus = "-".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var dot = ".".charCodeAt(0);
    var exp = "e".charCodeAt(0);
    var EXP = "E".charCodeAt(0);
    function likeNumber(value) {
      var code = value.charCodeAt(0);
      var nextCode;
      if (code === plus || code === minus) {
        nextCode = value.charCodeAt(1);
        if (nextCode >= 48 && nextCode <= 57) {
          return true;
        }
        var nextNextCode = value.charCodeAt(2);
        if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {
          return true;
        }
        return false;
      }
      if (code === dot) {
        nextCode = value.charCodeAt(1);
        if (nextCode >= 48 && nextCode <= 57) {
          return true;
        }
        return false;
      }
      if (code >= 48 && code <= 57) {
        return true;
      }
      return false;
    }
    module2.exports = function(value) {
      var pos = 0;
      var length = value.length;
      var code;
      var nextCode;
      var nextNextCode;
      if (length === 0 || !likeNumber(value)) {
        return false;
      }
      code = value.charCodeAt(pos);
      if (code === plus || code === minus) {
        pos++;
      }
      while (pos < length) {
        code = value.charCodeAt(pos);
        if (code < 48 || code > 57) {
          break;
        }
        pos += 1;
      }
      code = value.charCodeAt(pos);
      nextCode = value.charCodeAt(pos + 1);
      if (code === dot && nextCode >= 48 && nextCode <= 57) {
        pos += 2;
        while (pos < length) {
          code = value.charCodeAt(pos);
          if (code < 48 || code > 57) {
            break;
          }
          pos += 1;
        }
      }
      code = value.charCodeAt(pos);
      nextCode = value.charCodeAt(pos + 1);
      nextNextCode = value.charCodeAt(pos + 2);
      if ((code === exp || code === EXP) && (nextCode >= 48 && nextCode <= 57 || (nextCode === plus || nextCode === minus) && nextNextCode >= 48 && nextNextCode <= 57)) {
        pos += nextCode === plus || nextCode === minus ? 3 : 2;
        while (pos < length) {
          code = value.charCodeAt(pos);
          if (code < 48 || code > 57) {
            break;
          }
          pos += 1;
        }
      }
      return {
        number: value.slice(0, pos),
        unit: value.slice(pos)
      };
    };
  }
});

// node_modules/postcss-value-parser/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/postcss-value-parser/lib/index.js"(exports, module2) {
    var parse2 = require_parse2();
    var walk = require_walk();
    var stringify2 = require_stringify2();
    function ValueParser(value) {
      if (this instanceof ValueParser) {
        this.nodes = parse2(value);
        return this;
      }
      return new ValueParser(value);
    }
    ValueParser.prototype.toString = function() {
      return Array.isArray(this.nodes) ? stringify2(this.nodes) : "";
    };
    ValueParser.prototype.walk = function(cb, bubble) {
      walk(this.nodes, cb, bubble);
      return this;
    };
    ValueParser.unit = require_unit();
    ValueParser.walk = walk;
    ValueParser.stringify = stringify2;
    module2.exports = ValueParser;
  }
});

// node_modules/postcss-import/lib/parse-statements.js
var require_parse_statements = __commonJS({
  "node_modules/postcss-import/lib/parse-statements.js"(exports, module2) {
    "use strict";
    var valueParser = require_lib2();
    var { stringify: stringify2 } = valueParser;
    function split(params, start) {
      const list2 = [];
      const last = params.reduce((item, node, index) => {
        if (index < start)
          return "";
        if (node.type === "div" && node.value === ",") {
          list2.push(item);
          return "";
        }
        return item + stringify2(node);
      }, "");
      list2.push(last);
      return list2;
    }
    module2.exports = function(result, styles) {
      const statements = [];
      let nodes = [];
      styles.each((node) => {
        let stmt;
        if (node.type === "atrule") {
          if (node.name === "import")
            stmt = parseImport(result, node);
          else if (node.name === "media")
            stmt = parseMedia(result, node);
          else if (node.name === "charset")
            stmt = parseCharset(result, node);
        }
        if (stmt) {
          if (nodes.length) {
            statements.push({
              type: "nodes",
              nodes,
              media: [],
              layer: []
            });
            nodes = [];
          }
          statements.push(stmt);
        } else
          nodes.push(node);
      });
      if (nodes.length) {
        statements.push({
          type: "nodes",
          nodes,
          media: [],
          layer: []
        });
      }
      return statements;
    };
    function parseMedia(result, atRule2) {
      const params = valueParser(atRule2.params).nodes;
      return {
        type: "media",
        node: atRule2,
        media: split(params, 0),
        layer: []
      };
    }
    function parseCharset(result, atRule2) {
      if (atRule2.prev()) {
        return result.warn("@charset must precede all other statements", {
          node: atRule2
        });
      }
      return {
        type: "charset",
        node: atRule2,
        media: [],
        layer: []
      };
    }
    function parseImport(result, atRule2) {
      let prev = atRule2.prev();
      if (prev) {
        do {
          if (prev.type !== "comment" && (prev.type !== "atrule" || prev.name !== "import" && prev.name !== "charset" && !(prev.name === "layer" && !prev.nodes))) {
            return result.warn(
              "@import must precede all other statements (besides @charset or empty @layer)",
              { node: atRule2 }
            );
          }
          prev = prev.prev();
        } while (prev);
      }
      if (atRule2.nodes) {
        return result.warn(
          "It looks like you didn't end your @import statement correctly. Child nodes are attached to it.",
          { node: atRule2 }
        );
      }
      const params = valueParser(atRule2.params).nodes;
      const stmt = {
        type: "import",
        node: atRule2,
        media: [],
        layer: []
      };
      if (!params.length || (params[0].type !== "string" || !params[0].value) && (params[0].type !== "function" || params[0].value !== "url" || !params[0].nodes.length || !params[0].nodes[0].value)) {
        return result.warn(`Unable to find uri in '${atRule2.toString()}'`, {
          node: atRule2
        });
      }
      if (params[0].type === "string")
        stmt.uri = params[0].value;
      else
        stmt.uri = params[0].nodes[0].value;
      stmt.fullUri = stringify2(params[0]);
      let remainder = params;
      if (remainder.length > 2) {
        if ((remainder[2].type === "word" || remainder[2].type === "function") && remainder[2].value === "layer") {
          if (remainder[1].type !== "space") {
            return result.warn("Invalid import layer statement", { node: atRule2 });
          }
          if (remainder[2].nodes) {
            stmt.layer = [stringify2(remainder[2].nodes)];
          } else {
            stmt.layer = [""];
          }
          remainder = remainder.slice(2);
        }
      }
      if (remainder.length > 2) {
        if (remainder[1].type !== "space") {
          return result.warn("Invalid import media statement", { node: atRule2 });
        }
        stmt.media = split(remainder, 2);
      }
      return stmt;
    }
  }
});

// node_modules/postcss-import/lib/assign-layer-names.js
var require_assign_layer_names = __commonJS({
  "node_modules/postcss-import/lib/assign-layer-names.js"(exports, module2) {
    "use strict";
    module2.exports = function(layer, node, state, options) {
      layer.forEach((layerPart, i) => {
        if (layerPart.trim() === "") {
          if (options.nameLayer) {
            layer[i] = options.nameLayer(state.anonymousLayerCounter++, state.rootFilename).toString();
          } else {
            throw node.error(
              `When using anonymous layers in @import you must also set the "nameLayer" plugin option`
            );
          }
        }
      });
    };
  }
});

// node_modules/postcss-import/index.js
var require_postcss_import = __commonJS({
  "node_modules/postcss-import/index.js"(exports, module2) {
    "use strict";
    var path3 = require("path");
    var joinMedia = require_join_media();
    var joinLayer = require_join_layer();
    var resolveId = require_resolve_id();
    var loadContent2 = require_load_content();
    var processContent = require_process_content();
    var parseStatements = require_parse_statements();
    var assignLayerNames = require_assign_layer_names();
    var dataURL = require_data_url();
    function AtImport(options) {
      options = {
        root: process.cwd(),
        path: [],
        skipDuplicates: true,
        resolve: resolveId,
        load: loadContent2,
        plugins: [],
        addModulesDirectories: [],
        nameLayer: null,
        ...options
      };
      options.root = path3.resolve(options.root);
      if (typeof options.path === "string")
        options.path = [options.path];
      if (!Array.isArray(options.path))
        options.path = [];
      options.path = options.path.map((p) => path3.resolve(options.root, p));
      return {
        postcssPlugin: "postcss-import",
        Once(styles, { result, atRule: atRule2, postcss: postcss2 }) {
          const state = {
            importedFiles: {},
            hashFiles: {},
            rootFilename: null,
            anonymousLayerCounter: 0
          };
          if (styles.source?.input?.file) {
            state.rootFilename = styles.source.input.file;
            state.importedFiles[styles.source.input.file] = {};
          }
          if (options.plugins && !Array.isArray(options.plugins)) {
            throw new Error("plugins option must be an array");
          }
          if (options.nameLayer && typeof options.nameLayer !== "function") {
            throw new Error("nameLayer option must be a function");
          }
          return parseStyles(result, styles, options, state, [], []).then(
            (bundle) => {
              applyRaws(bundle);
              applyMedia(bundle);
              applyStyles(bundle, styles);
            }
          );
          function applyRaws(bundle) {
            bundle.forEach((stmt, index) => {
              if (index === 0)
                return;
              if (stmt.parent) {
                const { before } = stmt.parent.node.raws;
                if (stmt.type === "nodes")
                  stmt.nodes[0].raws.before = before;
                else
                  stmt.node.raws.before = before;
              } else if (stmt.type === "nodes") {
                stmt.nodes[0].raws.before = stmt.nodes[0].raws.before || "\n";
              }
            });
          }
          function applyMedia(bundle) {
            bundle.forEach((stmt) => {
              if (!stmt.media.length && !stmt.layer.length || stmt.type === "charset") {
                return;
              }
              if (stmt.layer.length > 1) {
                assignLayerNames(stmt.layer, stmt.node, state, options);
              }
              if (stmt.type === "import") {
                const parts = [stmt.fullUri];
                const media = stmt.media.join(", ");
                if (stmt.layer.length) {
                  const layerName = stmt.layer.join(".");
                  let layerParams = "layer";
                  if (layerName) {
                    layerParams = `layer(${layerName})`;
                  }
                  parts.push(layerParams);
                }
                if (media) {
                  parts.push(media);
                }
                stmt.node.params = parts.join(" ");
              } else if (stmt.type === "media") {
                if (stmt.layer.length) {
                  const layerNode = atRule2({
                    name: "layer",
                    params: stmt.layer.join("."),
                    source: stmt.node.source
                  });
                  if (stmt.parentMedia?.length) {
                    const mediaNode = atRule2({
                      name: "media",
                      params: stmt.parentMedia.join(", "),
                      source: stmt.node.source
                    });
                    mediaNode.append(layerNode);
                    layerNode.append(stmt.node);
                    stmt.node = mediaNode;
                  } else {
                    layerNode.append(stmt.node);
                    stmt.node = layerNode;
                  }
                } else {
                  stmt.node.params = stmt.media.join(", ");
                }
              } else {
                const { nodes } = stmt;
                const { parent } = nodes[0];
                let outerAtRule;
                let innerAtRule;
                if (stmt.media.length && stmt.layer.length) {
                  const mediaNode = atRule2({
                    name: "media",
                    params: stmt.media.join(", "),
                    source: parent.source
                  });
                  const layerNode = atRule2({
                    name: "layer",
                    params: stmt.layer.join("."),
                    source: parent.source
                  });
                  mediaNode.append(layerNode);
                  innerAtRule = layerNode;
                  outerAtRule = mediaNode;
                } else if (stmt.media.length) {
                  const mediaNode = atRule2({
                    name: "media",
                    params: stmt.media.join(", "),
                    source: parent.source
                  });
                  innerAtRule = mediaNode;
                  outerAtRule = mediaNode;
                } else if (stmt.layer.length) {
                  const layerNode = atRule2({
                    name: "layer",
                    params: stmt.layer.join("."),
                    source: parent.source
                  });
                  innerAtRule = layerNode;
                  outerAtRule = layerNode;
                }
                parent.insertBefore(nodes[0], outerAtRule);
                nodes.forEach((node) => {
                  node.parent = void 0;
                });
                nodes[0].raws.before = nodes[0].raws.before || "\n";
                innerAtRule.append(nodes);
                stmt.type = "media";
                stmt.node = outerAtRule;
                delete stmt.nodes;
              }
            });
          }
          function applyStyles(bundle, styles2) {
            styles2.nodes = [];
            bundle.forEach((stmt) => {
              if (["charset", "import", "media"].includes(stmt.type)) {
                stmt.node.parent = void 0;
                styles2.append(stmt.node);
              } else if (stmt.type === "nodes") {
                stmt.nodes.forEach((node) => {
                  node.parent = void 0;
                  styles2.append(node);
                });
              }
            });
          }
          function parseStyles(result2, styles2, options2, state2, media, layer) {
            const statements = parseStatements(result2, styles2);
            return Promise.resolve(statements).then((stmts) => {
              return stmts.reduce((promise, stmt) => {
                return promise.then(() => {
                  stmt.media = joinMedia(media, stmt.media || []);
                  stmt.parentMedia = media;
                  stmt.layer = joinLayer(layer, stmt.layer || []);
                  if (stmt.type !== "import" || /^(?:[a-z]+:)?\/\//i.test(stmt.uri)) {
                    return;
                  }
                  if (options2.filter && !options2.filter(stmt.uri)) {
                    return;
                  }
                  return resolveImportId(result2, stmt, options2, state2);
                });
              }, Promise.resolve());
            }).then(() => {
              let charset;
              const imports = [];
              const bundle = [];
              function handleCharset(stmt) {
                if (!charset)
                  charset = stmt;
                else if (stmt.node.params.toLowerCase() !== charset.node.params.toLowerCase()) {
                  throw new Error(
                    `Incompatable @charset statements:
  ${stmt.node.params} specified in ${stmt.node.source.input.file}
  ${charset.node.params} specified in ${charset.node.source.input.file}`
                  );
                }
              }
              statements.forEach((stmt) => {
                if (stmt.type === "charset")
                  handleCharset(stmt);
                else if (stmt.type === "import") {
                  if (stmt.children) {
                    stmt.children.forEach((child, index) => {
                      if (child.type === "import")
                        imports.push(child);
                      else if (child.type === "charset")
                        handleCharset(child);
                      else
                        bundle.push(child);
                      if (index === 0)
                        child.parent = stmt;
                    });
                  } else
                    imports.push(stmt);
                } else if (stmt.type === "media" || stmt.type === "nodes") {
                  bundle.push(stmt);
                }
              });
              return charset ? [charset, ...imports.concat(bundle)] : imports.concat(bundle);
            });
          }
          function resolveImportId(result2, stmt, options2, state2) {
            if (dataURL.isValid(stmt.uri)) {
              return loadImportContent(result2, stmt, stmt.uri, options2, state2).then(
                (result3) => {
                  stmt.children = result3;
                }
              );
            }
            const atRule3 = stmt.node;
            let sourceFile;
            if (atRule3.source?.input?.file) {
              sourceFile = atRule3.source.input.file;
            }
            const base = sourceFile ? path3.dirname(atRule3.source.input.file) : options2.root;
            return Promise.resolve(options2.resolve(stmt.uri, base, options2)).then((paths) => {
              if (!Array.isArray(paths))
                paths = [paths];
              return Promise.all(
                paths.map((file) => {
                  return !path3.isAbsolute(file) ? resolveId(file, base, options2) : file;
                })
              );
            }).then((resolved) => {
              resolved.forEach((file) => {
                result2.messages.push({
                  type: "dependency",
                  plugin: "postcss-import",
                  file,
                  parent: sourceFile
                });
              });
              return Promise.all(
                resolved.map((file) => {
                  return loadImportContent(result2, stmt, file, options2, state2);
                })
              );
            }).then((result3) => {
              stmt.children = result3.reduce((result4, statements) => {
                return statements ? result4.concat(statements) : result4;
              }, []);
            });
          }
          function loadImportContent(result2, stmt, filename, options2, state2) {
            const atRule3 = stmt.node;
            const { media, layer } = stmt;
            assignLayerNames(layer, atRule3, state2, options2);
            if (options2.skipDuplicates) {
              if (state2.importedFiles[filename]?.[media]?.[layer]) {
                return;
              }
              if (!state2.importedFiles[filename]) {
                state2.importedFiles[filename] = {};
              }
              if (!state2.importedFiles[filename][media]) {
                state2.importedFiles[filename][media] = {};
              }
              state2.importedFiles[filename][media][layer] = true;
            }
            return Promise.resolve(options2.load(filename, options2)).then(
              (content) => {
                if (content.trim() === "") {
                  result2.warn(`${filename} is empty`, { node: atRule3 });
                  return;
                }
                if (state2.hashFiles[content]?.[media]?.[layer]) {
                  return;
                }
                return processContent(
                  result2,
                  content,
                  filename,
                  options2,
                  postcss2
                ).then((importedResult) => {
                  const styles2 = importedResult.root;
                  result2.messages = result2.messages.concat(importedResult.messages);
                  if (options2.skipDuplicates) {
                    const hasImport = styles2.some((child) => {
                      return child.type === "atrule" && child.name === "import";
                    });
                    if (!hasImport) {
                      if (!state2.hashFiles[content]) {
                        state2.hashFiles[content] = {};
                      }
                      if (!state2.hashFiles[content][media]) {
                        state2.hashFiles[content][media] = {};
                      }
                      state2.hashFiles[content][media][layer] = true;
                    }
                  }
                  return parseStyles(result2, styles2, options2, state2, media, layer);
                });
              }
            );
          }
        }
      };
    }
    AtImport.postcss = true;
    module2.exports = AtImport;
  }
});

// node_modules/postcss-selector-parser/dist/util/unesc.js
var require_unesc = __commonJS({
  "node_modules/postcss-selector-parser/dist/util/unesc.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = unesc;
    function gobbleHex(str) {
      var lower = str.toLowerCase();
      var hex = "";
      var spaceTerminated = false;
      for (var i = 0; i < 6 && lower[i] !== void 0; i++) {
        var code = lower.charCodeAt(i);
        var valid = code >= 97 && code <= 102 || code >= 48 && code <= 57;
        spaceTerminated = code === 32;
        if (!valid) {
          break;
        }
        hex += lower[i];
      }
      if (hex.length === 0) {
        return void 0;
      }
      var codePoint = parseInt(hex, 16);
      var isSurrogate = codePoint >= 55296 && codePoint <= 57343;
      if (isSurrogate || codePoint === 0 || codePoint > 1114111) {
        return ["\uFFFD", hex.length + (spaceTerminated ? 1 : 0)];
      }
      return [String.fromCodePoint(codePoint), hex.length + (spaceTerminated ? 1 : 0)];
    }
    var CONTAINS_ESCAPE = /\\/;
    function unesc(str) {
      var needToProcess = CONTAINS_ESCAPE.test(str);
      if (!needToProcess) {
        return str;
      }
      var ret = "";
      for (var i = 0; i < str.length; i++) {
        if (str[i] === "\\") {
          var gobbled = gobbleHex(str.slice(i + 1, i + 7));
          if (gobbled !== void 0) {
            ret += gobbled[0];
            i += gobbled[1];
            continue;
          }
          if (str[i + 1] === "\\") {
            ret += "\\";
            i++;
            continue;
          }
          if (str.length === i + 1) {
            ret += str[i];
          }
          continue;
        }
        ret += str[i];
      }
      return ret;
    }
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/util/getProp.js
var require_getProp = __commonJS({
  "node_modules/postcss-selector-parser/dist/util/getProp.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = getProp;
    function getProp(obj) {
      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }
      while (props.length > 0) {
        var prop = props.shift();
        if (!obj[prop]) {
          return void 0;
        }
        obj = obj[prop];
      }
      return obj;
    }
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/util/ensureObject.js
var require_ensureObject = __commonJS({
  "node_modules/postcss-selector-parser/dist/util/ensureObject.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = ensureObject;
    function ensureObject(obj) {
      for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        props[_key - 1] = arguments[_key];
      }
      while (props.length > 0) {
        var prop = props.shift();
        if (!obj[prop]) {
          obj[prop] = {};
        }
        obj = obj[prop];
      }
    }
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/util/stripComments.js
var require_stripComments = __commonJS({
  "node_modules/postcss-selector-parser/dist/util/stripComments.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = stripComments;
    function stripComments(str) {
      var s = "";
      var commentStart = str.indexOf("/*");
      var lastEnd = 0;
      while (commentStart >= 0) {
        s = s + str.slice(lastEnd, commentStart);
        var commentEnd = str.indexOf("*/", commentStart + 2);
        if (commentEnd < 0) {
          return s;
        }
        lastEnd = commentEnd + 2;
        commentStart = str.indexOf("/*", lastEnd);
      }
      s = s + str.slice(lastEnd);
      return s;
    }
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/util/index.js
var require_util2 = __commonJS({
  "node_modules/postcss-selector-parser/dist/util/index.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.stripComments = exports.ensureObject = exports.getProp = exports.unesc = void 0;
    var _unesc = _interopRequireDefault(require_unesc());
    exports.unesc = _unesc["default"];
    var _getProp = _interopRequireDefault(require_getProp());
    exports.getProp = _getProp["default"];
    var _ensureObject = _interopRequireDefault(require_ensureObject());
    exports.ensureObject = _ensureObject["default"];
    var _stripComments = _interopRequireDefault(require_stripComments());
    exports.stripComments = _stripComments["default"];
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
  }
});

// node_modules/postcss-selector-parser/dist/selectors/node.js
var require_node2 = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/node.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _util = require_util2();
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var cloneNode = function cloneNode2(obj, parent) {
      if (typeof obj !== "object" || obj === null) {
        return obj;
      }
      var cloned = new obj.constructor();
      for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
          continue;
        }
        var value = obj[i];
        var type = typeof value;
        if (i === "parent" && type === "object") {
          if (parent) {
            cloned[i] = parent;
          }
        } else if (value instanceof Array) {
          cloned[i] = value.map(function(j) {
            return cloneNode2(j, cloned);
          });
        } else {
          cloned[i] = cloneNode2(value, cloned);
        }
      }
      return cloned;
    };
    var Node3 = /* @__PURE__ */ function() {
      function Node4(opts) {
        if (opts === void 0) {
          opts = {};
        }
        Object.assign(this, opts);
        this.spaces = this.spaces || {};
        this.spaces.before = this.spaces.before || "";
        this.spaces.after = this.spaces.after || "";
      }
      var _proto = Node4.prototype;
      _proto.remove = function remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      };
      _proto.replaceWith = function replaceWith() {
        if (this.parent) {
          for (var index in arguments) {
            this.parent.insertBefore(this, arguments[index]);
          }
          this.remove();
        }
        return this;
      };
      _proto.next = function next() {
        return this.parent.at(this.parent.index(this) + 1);
      };
      _proto.prev = function prev() {
        return this.parent.at(this.parent.index(this) - 1);
      };
      _proto.clone = function clone(overrides) {
        if (overrides === void 0) {
          overrides = {};
        }
        var cloned = cloneNode(this);
        for (var name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      };
      _proto.appendToPropertyAndEscape = function appendToPropertyAndEscape(name, value, valueEscaped) {
        if (!this.raws) {
          this.raws = {};
        }
        var originalValue = this[name];
        var originalEscaped = this.raws[name];
        this[name] = originalValue + value;
        if (originalEscaped || valueEscaped !== value) {
          this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
        } else {
          delete this.raws[name];
        }
      };
      _proto.setPropertyAndEscape = function setPropertyAndEscape(name, value, valueEscaped) {
        if (!this.raws) {
          this.raws = {};
        }
        this[name] = value;
        this.raws[name] = valueEscaped;
      };
      _proto.setPropertyWithoutEscape = function setPropertyWithoutEscape(name, value) {
        this[name] = value;
        if (this.raws) {
          delete this.raws[name];
        }
      };
      _proto.isAtPosition = function isAtPosition(line, column) {
        if (this.source && this.source.start && this.source.end) {
          if (this.source.start.line > line) {
            return false;
          }
          if (this.source.end.line < line) {
            return false;
          }
          if (this.source.start.line === line && this.source.start.column > column) {
            return false;
          }
          if (this.source.end.line === line && this.source.end.column < column) {
            return false;
          }
          return true;
        }
        return void 0;
      };
      _proto.stringifyProperty = function stringifyProperty(name) {
        return this.raws && this.raws[name] || this[name];
      };
      _proto.valueToString = function valueToString() {
        return String(this.stringifyProperty("value"));
      };
      _proto.toString = function toString() {
        return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
      };
      _createClass(Node4, [{
        key: "rawSpaceBefore",
        get: function get() {
          var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;
          if (rawSpace === void 0) {
            rawSpace = this.spaces && this.spaces.before;
          }
          return rawSpace || "";
        },
        set: function set(raw) {
          (0, _util.ensureObject)(this, "raws", "spaces");
          this.raws.spaces.before = raw;
        }
      }, {
        key: "rawSpaceAfter",
        get: function get() {
          var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;
          if (rawSpace === void 0) {
            rawSpace = this.spaces.after;
          }
          return rawSpace || "";
        },
        set: function set(raw) {
          (0, _util.ensureObject)(this, "raws", "spaces");
          this.raws.spaces.after = raw;
        }
      }]);
      return Node4;
    }();
    exports["default"] = Node3;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/types.js
var require_types = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/types.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.UNIVERSAL = exports.ATTRIBUTE = exports.CLASS = exports.COMBINATOR = exports.COMMENT = exports.ID = exports.NESTING = exports.PSEUDO = exports.ROOT = exports.SELECTOR = exports.STRING = exports.TAG = void 0;
    var TAG = "tag";
    exports.TAG = TAG;
    var STRING = "string";
    exports.STRING = STRING;
    var SELECTOR = "selector";
    exports.SELECTOR = SELECTOR;
    var ROOT = "root";
    exports.ROOT = ROOT;
    var PSEUDO = "pseudo";
    exports.PSEUDO = PSEUDO;
    var NESTING = "nesting";
    exports.NESTING = NESTING;
    var ID = "id";
    exports.ID = ID;
    var COMMENT = "comment";
    exports.COMMENT = COMMENT;
    var COMBINATOR = "combinator";
    exports.COMBINATOR = COMBINATOR;
    var CLASS = "class";
    exports.CLASS = CLASS;
    var ATTRIBUTE = "attribute";
    exports.ATTRIBUTE = ATTRIBUTE;
    var UNIVERSAL = "universal";
    exports.UNIVERSAL = UNIVERSAL;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/container.js
var require_container2 = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/container.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var types = _interopRequireWildcard(require_types());
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          return function() {
            if (i >= o.length)
              return { done: true };
            return { done: false, value: o[i++] };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Container2 = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Container3, _Node);
      function Container3(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        if (!_this.nodes) {
          _this.nodes = [];
        }
        return _this;
      }
      var _proto = Container3.prototype;
      _proto.append = function append(selector) {
        selector.parent = this;
        this.nodes.push(selector);
        return this;
      };
      _proto.prepend = function prepend(selector) {
        selector.parent = this;
        this.nodes.unshift(selector);
        return this;
      };
      _proto.at = function at(index) {
        return this.nodes[index];
      };
      _proto.index = function index(child) {
        if (typeof child === "number") {
          return child;
        }
        return this.nodes.indexOf(child);
      };
      _proto.removeChild = function removeChild(child) {
        child = this.index(child);
        this.at(child).parent = void 0;
        this.nodes.splice(child, 1);
        var index;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (index >= child) {
            this.indexes[id] = index - 1;
          }
        }
        return this;
      };
      _proto.removeAll = function removeAll() {
        for (var _iterator = _createForOfIteratorHelperLoose(this.nodes), _step; !(_step = _iterator()).done; ) {
          var node = _step.value;
          node.parent = void 0;
        }
        this.nodes = [];
        return this;
      };
      _proto.empty = function empty() {
        return this.removeAll();
      };
      _proto.insertAfter = function insertAfter(oldNode, newNode) {
        newNode.parent = this;
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex + 1, 0, newNode);
        newNode.parent = this;
        var index;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (oldIndex <= index) {
            this.indexes[id] = index + 1;
          }
        }
        return this;
      };
      _proto.insertBefore = function insertBefore(oldNode, newNode) {
        newNode.parent = this;
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex, 0, newNode);
        newNode.parent = this;
        var index;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (index <= oldIndex) {
            this.indexes[id] = index + 1;
          }
        }
        return this;
      };
      _proto._findChildAtPosition = function _findChildAtPosition(line, col) {
        var found = void 0;
        this.each(function(node) {
          if (node.atPosition) {
            var foundChild = node.atPosition(line, col);
            if (foundChild) {
              found = foundChild;
              return false;
            }
          } else if (node.isAtPosition(line, col)) {
            found = node;
            return false;
          }
        });
        return found;
      };
      _proto.atPosition = function atPosition(line, col) {
        if (this.isAtPosition(line, col)) {
          return this._findChildAtPosition(line, col) || this;
        } else {
          return void 0;
        }
      };
      _proto._inferEndPosition = function _inferEndPosition() {
        if (this.last && this.last.source && this.last.source.end) {
          this.source = this.source || {};
          this.source.end = this.source.end || {};
          Object.assign(this.source.end, this.last.source.end);
        }
      };
      _proto.each = function each(callback) {
        if (!this.lastEach) {
          this.lastEach = 0;
        }
        if (!this.indexes) {
          this.indexes = {};
        }
        this.lastEach++;
        var id = this.lastEach;
        this.indexes[id] = 0;
        if (!this.length) {
          return void 0;
        }
        var index, result;
        while (this.indexes[id] < this.length) {
          index = this.indexes[id];
          result = callback(this.at(index), index);
          if (result === false) {
            break;
          }
          this.indexes[id] += 1;
        }
        delete this.indexes[id];
        if (result === false) {
          return false;
        }
      };
      _proto.walk = function walk(callback) {
        return this.each(function(node, i) {
          var result = callback(node, i);
          if (result !== false && node.length) {
            result = node.walk(callback);
          }
          if (result === false) {
            return false;
          }
        });
      };
      _proto.walkAttributes = function walkAttributes(callback) {
        var _this2 = this;
        return this.walk(function(selector) {
          if (selector.type === types.ATTRIBUTE) {
            return callback.call(_this2, selector);
          }
        });
      };
      _proto.walkClasses = function walkClasses(callback) {
        var _this3 = this;
        return this.walk(function(selector) {
          if (selector.type === types.CLASS) {
            return callback.call(_this3, selector);
          }
        });
      };
      _proto.walkCombinators = function walkCombinators(callback) {
        var _this4 = this;
        return this.walk(function(selector) {
          if (selector.type === types.COMBINATOR) {
            return callback.call(_this4, selector);
          }
        });
      };
      _proto.walkComments = function walkComments(callback) {
        var _this5 = this;
        return this.walk(function(selector) {
          if (selector.type === types.COMMENT) {
            return callback.call(_this5, selector);
          }
        });
      };
      _proto.walkIds = function walkIds(callback) {
        var _this6 = this;
        return this.walk(function(selector) {
          if (selector.type === types.ID) {
            return callback.call(_this6, selector);
          }
        });
      };
      _proto.walkNesting = function walkNesting(callback) {
        var _this7 = this;
        return this.walk(function(selector) {
          if (selector.type === types.NESTING) {
            return callback.call(_this7, selector);
          }
        });
      };
      _proto.walkPseudos = function walkPseudos(callback) {
        var _this8 = this;
        return this.walk(function(selector) {
          if (selector.type === types.PSEUDO) {
            return callback.call(_this8, selector);
          }
        });
      };
      _proto.walkTags = function walkTags(callback) {
        var _this9 = this;
        return this.walk(function(selector) {
          if (selector.type === types.TAG) {
            return callback.call(_this9, selector);
          }
        });
      };
      _proto.walkUniversals = function walkUniversals(callback) {
        var _this10 = this;
        return this.walk(function(selector) {
          if (selector.type === types.UNIVERSAL) {
            return callback.call(_this10, selector);
          }
        });
      };
      _proto.split = function split(callback) {
        var _this11 = this;
        var current = [];
        return this.reduce(function(memo, node, index) {
          var split2 = callback.call(_this11, node);
          current.push(node);
          if (split2) {
            memo.push(current);
            current = [];
          } else if (index === _this11.length - 1) {
            memo.push(current);
          }
          return memo;
        }, []);
      };
      _proto.map = function map(callback) {
        return this.nodes.map(callback);
      };
      _proto.reduce = function reduce(callback, memo) {
        return this.nodes.reduce(callback, memo);
      };
      _proto.every = function every(callback) {
        return this.nodes.every(callback);
      };
      _proto.some = function some(callback) {
        return this.nodes.some(callback);
      };
      _proto.filter = function filter(callback) {
        return this.nodes.filter(callback);
      };
      _proto.sort = function sort(callback) {
        return this.nodes.sort(callback);
      };
      _proto.toString = function toString() {
        return this.map(String).join("");
      };
      _createClass(Container3, [{
        key: "first",
        get: function get() {
          return this.at(0);
        }
      }, {
        key: "last",
        get: function get() {
          return this.at(this.length - 1);
        }
      }, {
        key: "length",
        get: function get() {
          return this.nodes.length;
        }
      }]);
      return Container3;
    }(_node["default"]);
    exports["default"] = Container2;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/root.js
var require_root2 = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/root.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _container = _interopRequireDefault(require_container2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Root2 = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(Root3, _Container);
      function Root3(opts) {
        var _this;
        _this = _Container.call(this, opts) || this;
        _this.type = _types.ROOT;
        return _this;
      }
      var _proto = Root3.prototype;
      _proto.toString = function toString() {
        var str = this.reduce(function(memo, selector) {
          memo.push(String(selector));
          return memo;
        }, []).join(",");
        return this.trailingComma ? str + "," : str;
      };
      _proto.error = function error(message, options) {
        if (this._error) {
          return this._error(message, options);
        } else {
          return new Error(message);
        }
      };
      _createClass(Root3, [{
        key: "errorGenerator",
        set: function set(handler) {
          this._error = handler;
        }
      }]);
      return Root3;
    }(_container["default"]);
    exports["default"] = Root2;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/selector.js
var require_selector = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/selector.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _container = _interopRequireDefault(require_container2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Selector = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(Selector2, _Container);
      function Selector2(opts) {
        var _this;
        _this = _Container.call(this, opts) || this;
        _this.type = _types.SELECTOR;
        return _this;
      }
      return Selector2;
    }(_container["default"]);
    exports["default"] = Selector;
    module2.exports = exports.default;
  }
});

// node_modules/cssesc/cssesc.js
var require_cssesc = __commonJS({
  "node_modules/cssesc/cssesc.js"(exports, module2) {
    "use strict";
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var merge = function merge2(options, defaults) {
      if (!options) {
        return defaults;
      }
      var result = {};
      for (var key in defaults) {
        result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
      }
      return result;
    };
    var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
    var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
    var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
    var cssesc = function cssesc2(string, options) {
      options = merge(options, cssesc2.options);
      if (options.quotes != "single" && options.quotes != "double") {
        options.quotes = "single";
      }
      var quote = options.quotes == "double" ? '"' : "'";
      var isIdentifier = options.isIdentifier;
      var firstChar = string.charAt(0);
      var output = "";
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var character = string.charAt(counter++);
        var codePoint = character.charCodeAt();
        var value = void 0;
        if (codePoint < 32 || codePoint > 126) {
          if (codePoint >= 55296 && codePoint <= 56319 && counter < length) {
            var extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
            } else {
              counter--;
            }
          }
          value = "\\" + codePoint.toString(16).toUpperCase() + " ";
        } else {
          if (options.escapeEverything) {
            if (regexAnySingleEscape.test(character)) {
              value = "\\" + character;
            } else {
              value = "\\" + codePoint.toString(16).toUpperCase() + " ";
            }
          } else if (/[\t\n\f\r\x0B]/.test(character)) {
            value = "\\" + codePoint.toString(16).toUpperCase() + " ";
          } else if (character == "\\" || !isIdentifier && (character == '"' && quote == character || character == "'" && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
            value = "\\" + character;
          } else {
            value = character;
          }
        }
        output += value;
      }
      if (isIdentifier) {
        if (/^-[-\d]/.test(output)) {
          output = "\\-" + output.slice(1);
        } else if (/\d/.test(firstChar)) {
          output = "\\3" + firstChar + " " + output.slice(1);
        }
      }
      output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
        if ($1 && $1.length % 2) {
          return $0;
        }
        return ($1 || "") + $2;
      });
      if (!isIdentifier && options.wrap) {
        return quote + output + quote;
      }
      return output;
    };
    cssesc.options = {
      "escapeEverything": false,
      "isIdentifier": false,
      "quotes": "single",
      "wrap": false
    };
    cssesc.version = "3.0.0";
    module2.exports = cssesc;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/className.js
var require_className = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/className.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _cssesc = _interopRequireDefault(require_cssesc());
    var _util = require_util2();
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var ClassName = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(ClassName2, _Node);
      function ClassName2(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.CLASS;
        _this._constructed = true;
        return _this;
      }
      var _proto = ClassName2.prototype;
      _proto.valueToString = function valueToString() {
        return "." + _Node.prototype.valueToString.call(this);
      };
      _createClass(ClassName2, [{
        key: "value",
        get: function get() {
          return this._value;
        },
        set: function set(v) {
          if (this._constructed) {
            var escaped = (0, _cssesc["default"])(v, {
              isIdentifier: true
            });
            if (escaped !== v) {
              (0, _util.ensureObject)(this, "raws");
              this.raws.value = escaped;
            } else if (this.raws) {
              delete this.raws.value;
            }
          }
          this._value = v;
        }
      }]);
      return ClassName2;
    }(_node["default"]);
    exports["default"] = ClassName;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/comment.js
var require_comment2 = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/comment.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Comment2 = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Comment3, _Node);
      function Comment3(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.COMMENT;
        return _this;
      }
      return Comment3;
    }(_node["default"]);
    exports["default"] = Comment2;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/id.js
var require_id = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/id.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var ID = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(ID2, _Node);
      function ID2(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.ID;
        return _this;
      }
      var _proto = ID2.prototype;
      _proto.valueToString = function valueToString() {
        return "#" + _Node.prototype.valueToString.call(this);
      };
      return ID2;
    }(_node["default"]);
    exports["default"] = ID;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/namespace.js
var require_namespace = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/namespace.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _cssesc = _interopRequireDefault(require_cssesc());
    var _util = require_util2();
    var _node = _interopRequireDefault(require_node2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Namespace = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Namespace2, _Node);
      function Namespace2() {
        return _Node.apply(this, arguments) || this;
      }
      var _proto = Namespace2.prototype;
      _proto.qualifiedName = function qualifiedName(value) {
        if (this.namespace) {
          return this.namespaceString + "|" + value;
        } else {
          return value;
        }
      };
      _proto.valueToString = function valueToString() {
        return this.qualifiedName(_Node.prototype.valueToString.call(this));
      };
      _createClass(Namespace2, [{
        key: "namespace",
        get: function get() {
          return this._namespace;
        },
        set: function set(namespace) {
          if (namespace === true || namespace === "*" || namespace === "&") {
            this._namespace = namespace;
            if (this.raws) {
              delete this.raws.namespace;
            }
            return;
          }
          var escaped = (0, _cssesc["default"])(namespace, {
            isIdentifier: true
          });
          this._namespace = namespace;
          if (escaped !== namespace) {
            (0, _util.ensureObject)(this, "raws");
            this.raws.namespace = escaped;
          } else if (this.raws) {
            delete this.raws.namespace;
          }
        }
      }, {
        key: "ns",
        get: function get() {
          return this._namespace;
        },
        set: function set(namespace) {
          this.namespace = namespace;
        }
      }, {
        key: "namespaceString",
        get: function get() {
          if (this.namespace) {
            var ns = this.stringifyProperty("namespace");
            if (ns === true) {
              return "";
            } else {
              return ns;
            }
          } else {
            return "";
          }
        }
      }]);
      return Namespace2;
    }(_node["default"]);
    exports["default"] = Namespace;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/tag.js
var require_tag = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/tag.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _namespace = _interopRequireDefault(require_namespace());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Tag = /* @__PURE__ */ function(_Namespace) {
      _inheritsLoose(Tag2, _Namespace);
      function Tag2(opts) {
        var _this;
        _this = _Namespace.call(this, opts) || this;
        _this.type = _types.TAG;
        return _this;
      }
      return Tag2;
    }(_namespace["default"]);
    exports["default"] = Tag;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/string.js
var require_string = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/string.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var String2 = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(String3, _Node);
      function String3(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.STRING;
        return _this;
      }
      return String3;
    }(_node["default"]);
    exports["default"] = String2;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/pseudo.js
var require_pseudo = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/pseudo.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _container = _interopRequireDefault(require_container2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Pseudo = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(Pseudo2, _Container);
      function Pseudo2(opts) {
        var _this;
        _this = _Container.call(this, opts) || this;
        _this.type = _types.PSEUDO;
        return _this;
      }
      var _proto = Pseudo2.prototype;
      _proto.toString = function toString() {
        var params = this.length ? "(" + this.map(String).join(",") + ")" : "";
        return [this.rawSpaceBefore, this.stringifyProperty("value"), params, this.rawSpaceAfter].join("");
      };
      return Pseudo2;
    }(_container["default"]);
    exports["default"] = Pseudo;
    module2.exports = exports.default;
  }
});

// node_modules/util-deprecate/node.js
var require_node3 = __commonJS({
  "node_modules/util-deprecate/node.js"(exports, module2) {
    module2.exports = require("util").deprecate;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/attribute.js
var require_attribute = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/attribute.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.unescapeValue = unescapeValue;
    exports["default"] = void 0;
    var _cssesc = _interopRequireDefault(require_cssesc());
    var _unesc = _interopRequireDefault(require_unesc());
    var _namespace = _interopRequireDefault(require_namespace());
    var _types = require_types();
    var _CSSESC_QUOTE_OPTIONS;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var deprecate = require_node3();
    var WRAPPED_IN_QUOTES = /^('|")([^]*)\1$/;
    var warnOfDeprecatedValueAssignment = deprecate(function() {
    }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead.");
    var warnOfDeprecatedQuotedAssignment = deprecate(function() {
    }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
    var warnOfDeprecatedConstructor = deprecate(function() {
    }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
    function unescapeValue(value) {
      var deprecatedUsage = false;
      var quoteMark = null;
      var unescaped = value;
      var m = unescaped.match(WRAPPED_IN_QUOTES);
      if (m) {
        quoteMark = m[1];
        unescaped = m[2];
      }
      unescaped = (0, _unesc["default"])(unescaped);
      if (unescaped !== value) {
        deprecatedUsage = true;
      }
      return {
        deprecatedUsage,
        unescaped,
        quoteMark
      };
    }
    function handleDeprecatedContructorOpts(opts) {
      if (opts.quoteMark !== void 0) {
        return opts;
      }
      if (opts.value === void 0) {
        return opts;
      }
      warnOfDeprecatedConstructor();
      var _unescapeValue = unescapeValue(opts.value), quoteMark = _unescapeValue.quoteMark, unescaped = _unescapeValue.unescaped;
      if (!opts.raws) {
        opts.raws = {};
      }
      if (opts.raws.value === void 0) {
        opts.raws.value = opts.value;
      }
      opts.value = unescaped;
      opts.quoteMark = quoteMark;
      return opts;
    }
    var Attribute = /* @__PURE__ */ function(_Namespace) {
      _inheritsLoose(Attribute2, _Namespace);
      function Attribute2(opts) {
        var _this;
        if (opts === void 0) {
          opts = {};
        }
        _this = _Namespace.call(this, handleDeprecatedContructorOpts(opts)) || this;
        _this.type = _types.ATTRIBUTE;
        _this.raws = _this.raws || {};
        Object.defineProperty(_this.raws, "unquoted", {
          get: deprecate(function() {
            return _this.value;
          }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
          set: deprecate(function() {
            return _this.value;
          }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
        });
        _this._constructed = true;
        return _this;
      }
      var _proto = Attribute2.prototype;
      _proto.getQuotedValue = function getQuotedValue(options) {
        if (options === void 0) {
          options = {};
        }
        var quoteMark = this._determineQuoteMark(options);
        var cssescopts = CSSESC_QUOTE_OPTIONS[quoteMark];
        var escaped = (0, _cssesc["default"])(this._value, cssescopts);
        return escaped;
      };
      _proto._determineQuoteMark = function _determineQuoteMark(options) {
        return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
      };
      _proto.setValue = function setValue(value, options) {
        if (options === void 0) {
          options = {};
        }
        this._value = value;
        this._quoteMark = this._determineQuoteMark(options);
        this._syncRawValue();
      };
      _proto.smartQuoteMark = function smartQuoteMark(options) {
        var v = this.value;
        var numSingleQuotes = v.replace(/[^']/g, "").length;
        var numDoubleQuotes = v.replace(/[^"]/g, "").length;
        if (numSingleQuotes + numDoubleQuotes === 0) {
          var escaped = (0, _cssesc["default"])(v, {
            isIdentifier: true
          });
          if (escaped === v) {
            return Attribute2.NO_QUOTE;
          } else {
            var pref = this.preferredQuoteMark(options);
            if (pref === Attribute2.NO_QUOTE) {
              var quote = this.quoteMark || options.quoteMark || Attribute2.DOUBLE_QUOTE;
              var opts = CSSESC_QUOTE_OPTIONS[quote];
              var quoteValue = (0, _cssesc["default"])(v, opts);
              if (quoteValue.length < escaped.length) {
                return quote;
              }
            }
            return pref;
          }
        } else if (numDoubleQuotes === numSingleQuotes) {
          return this.preferredQuoteMark(options);
        } else if (numDoubleQuotes < numSingleQuotes) {
          return Attribute2.DOUBLE_QUOTE;
        } else {
          return Attribute2.SINGLE_QUOTE;
        }
      };
      _proto.preferredQuoteMark = function preferredQuoteMark(options) {
        var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;
        if (quoteMark === void 0) {
          quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
        }
        if (quoteMark === void 0) {
          quoteMark = Attribute2.DOUBLE_QUOTE;
        }
        return quoteMark;
      };
      _proto._syncRawValue = function _syncRawValue() {
        var rawValue = (0, _cssesc["default"])(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);
        if (rawValue === this._value) {
          if (this.raws) {
            delete this.raws.value;
          }
        } else {
          this.raws.value = rawValue;
        }
      };
      _proto._handleEscapes = function _handleEscapes(prop, value) {
        if (this._constructed) {
          var escaped = (0, _cssesc["default"])(value, {
            isIdentifier: true
          });
          if (escaped !== value) {
            this.raws[prop] = escaped;
          } else {
            delete this.raws[prop];
          }
        }
      };
      _proto._spacesFor = function _spacesFor(name) {
        var attrSpaces = {
          before: "",
          after: ""
        };
        var spaces = this.spaces[name] || {};
        var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
        return Object.assign(attrSpaces, spaces, rawSpaces);
      };
      _proto._stringFor = function _stringFor(name, spaceName, concat) {
        if (spaceName === void 0) {
          spaceName = name;
        }
        if (concat === void 0) {
          concat = defaultAttrConcat;
        }
        var attrSpaces = this._spacesFor(spaceName);
        return concat(this.stringifyProperty(name), attrSpaces);
      };
      _proto.offsetOf = function offsetOf(name) {
        var count = 1;
        var attributeSpaces = this._spacesFor("attribute");
        count += attributeSpaces.before.length;
        if (name === "namespace" || name === "ns") {
          return this.namespace ? count : -1;
        }
        if (name === "attributeNS") {
          return count;
        }
        count += this.namespaceString.length;
        if (this.namespace) {
          count += 1;
        }
        if (name === "attribute") {
          return count;
        }
        count += this.stringifyProperty("attribute").length;
        count += attributeSpaces.after.length;
        var operatorSpaces = this._spacesFor("operator");
        count += operatorSpaces.before.length;
        var operator = this.stringifyProperty("operator");
        if (name === "operator") {
          return operator ? count : -1;
        }
        count += operator.length;
        count += operatorSpaces.after.length;
        var valueSpaces = this._spacesFor("value");
        count += valueSpaces.before.length;
        var value = this.stringifyProperty("value");
        if (name === "value") {
          return value ? count : -1;
        }
        count += value.length;
        count += valueSpaces.after.length;
        var insensitiveSpaces = this._spacesFor("insensitive");
        count += insensitiveSpaces.before.length;
        if (name === "insensitive") {
          return this.insensitive ? count : -1;
        }
        return -1;
      };
      _proto.toString = function toString() {
        var _this2 = this;
        var selector = [this.rawSpaceBefore, "["];
        selector.push(this._stringFor("qualifiedAttribute", "attribute"));
        if (this.operator && (this.value || this.value === "")) {
          selector.push(this._stringFor("operator"));
          selector.push(this._stringFor("value"));
          selector.push(this._stringFor("insensitiveFlag", "insensitive", function(attrValue, attrSpaces) {
            if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) {
              attrSpaces.before = " ";
            }
            return defaultAttrConcat(attrValue, attrSpaces);
          }));
        }
        selector.push("]");
        selector.push(this.rawSpaceAfter);
        return selector.join("");
      };
      _createClass(Attribute2, [{
        key: "quoted",
        get: function get() {
          var qm = this.quoteMark;
          return qm === "'" || qm === '"';
        },
        set: function set(value) {
          warnOfDeprecatedQuotedAssignment();
        }
      }, {
        key: "quoteMark",
        get: function get() {
          return this._quoteMark;
        },
        set: function set(quoteMark) {
          if (!this._constructed) {
            this._quoteMark = quoteMark;
            return;
          }
          if (this._quoteMark !== quoteMark) {
            this._quoteMark = quoteMark;
            this._syncRawValue();
          }
        }
      }, {
        key: "qualifiedAttribute",
        get: function get() {
          return this.qualifiedName(this.raws.attribute || this.attribute);
        }
      }, {
        key: "insensitiveFlag",
        get: function get() {
          return this.insensitive ? "i" : "";
        }
      }, {
        key: "value",
        get: function get() {
          return this._value;
        },
        set: function set(v) {
          if (this._constructed) {
            var _unescapeValue2 = unescapeValue(v), deprecatedUsage = _unescapeValue2.deprecatedUsage, unescaped = _unescapeValue2.unescaped, quoteMark = _unescapeValue2.quoteMark;
            if (deprecatedUsage) {
              warnOfDeprecatedValueAssignment();
            }
            if (unescaped === this._value && quoteMark === this._quoteMark) {
              return;
            }
            this._value = unescaped;
            this._quoteMark = quoteMark;
            this._syncRawValue();
          } else {
            this._value = v;
          }
        }
      }, {
        key: "insensitive",
        get: function get() {
          return this._insensitive;
        },
        set: function set(insensitive) {
          if (!insensitive) {
            this._insensitive = false;
            if (this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i")) {
              this.raws.insensitiveFlag = void 0;
            }
          }
          this._insensitive = insensitive;
        }
      }, {
        key: "attribute",
        get: function get() {
          return this._attribute;
        },
        set: function set(name) {
          this._handleEscapes("attribute", name);
          this._attribute = name;
        }
      }]);
      return Attribute2;
    }(_namespace["default"]);
    exports["default"] = Attribute;
    Attribute.NO_QUOTE = null;
    Attribute.SINGLE_QUOTE = "'";
    Attribute.DOUBLE_QUOTE = '"';
    var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
      "'": {
        quotes: "single",
        wrap: true
      },
      '"': {
        quotes: "double",
        wrap: true
      }
    }, _CSSESC_QUOTE_OPTIONS[null] = {
      isIdentifier: true
    }, _CSSESC_QUOTE_OPTIONS);
    function defaultAttrConcat(attrValue, attrSpaces) {
      return "" + attrSpaces.before + attrValue + attrSpaces.after;
    }
  }
});

// node_modules/postcss-selector-parser/dist/selectors/universal.js
var require_universal = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/universal.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _namespace = _interopRequireDefault(require_namespace());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Universal = /* @__PURE__ */ function(_Namespace) {
      _inheritsLoose(Universal2, _Namespace);
      function Universal2(opts) {
        var _this;
        _this = _Namespace.call(this, opts) || this;
        _this.type = _types.UNIVERSAL;
        _this.value = "*";
        return _this;
      }
      return Universal2;
    }(_namespace["default"]);
    exports["default"] = Universal;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/combinator.js
var require_combinator = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/combinator.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Combinator = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Combinator2, _Node);
      function Combinator2(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.COMBINATOR;
        return _this;
      }
      return Combinator2;
    }(_node["default"]);
    exports["default"] = Combinator;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/nesting.js
var require_nesting = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/nesting.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _node = _interopRequireDefault(require_node2());
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      _setPrototypeOf(subClass, superClass);
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    var Nesting = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Nesting2, _Node);
      function Nesting2(opts) {
        var _this;
        _this = _Node.call(this, opts) || this;
        _this.type = _types.NESTING;
        _this.value = "&";
        return _this;
      }
      return Nesting2;
    }(_node["default"]);
    exports["default"] = Nesting;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/sortAscending.js
var require_sortAscending = __commonJS({
  "node_modules/postcss-selector-parser/dist/sortAscending.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = sortAscending;
    function sortAscending(list2) {
      return list2.sort(function(a, b) {
        return a - b;
      });
    }
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/tokenTypes.js
var require_tokenTypes = __commonJS({
  "node_modules/postcss-selector-parser/dist/tokenTypes.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.combinator = exports.word = exports.comment = exports.str = exports.tab = exports.newline = exports.feed = exports.cr = exports.backslash = exports.bang = exports.slash = exports.doubleQuote = exports.singleQuote = exports.space = exports.greaterThan = exports.pipe = exports.equals = exports.plus = exports.caret = exports.tilde = exports.dollar = exports.closeSquare = exports.openSquare = exports.closeParenthesis = exports.openParenthesis = exports.semicolon = exports.colon = exports.comma = exports.at = exports.asterisk = exports.ampersand = void 0;
    var ampersand = 38;
    exports.ampersand = ampersand;
    var asterisk = 42;
    exports.asterisk = asterisk;
    var at = 64;
    exports.at = at;
    var comma = 44;
    exports.comma = comma;
    var colon = 58;
    exports.colon = colon;
    var semicolon = 59;
    exports.semicolon = semicolon;
    var openParenthesis = 40;
    exports.openParenthesis = openParenthesis;
    var closeParenthesis = 41;
    exports.closeParenthesis = closeParenthesis;
    var openSquare = 91;
    exports.openSquare = openSquare;
    var closeSquare = 93;
    exports.closeSquare = closeSquare;
    var dollar = 36;
    exports.dollar = dollar;
    var tilde = 126;
    exports.tilde = tilde;
    var caret = 94;
    exports.caret = caret;
    var plus = 43;
    exports.plus = plus;
    var equals = 61;
    exports.equals = equals;
    var pipe = 124;
    exports.pipe = pipe;
    var greaterThan = 62;
    exports.greaterThan = greaterThan;
    var space = 32;
    exports.space = space;
    var singleQuote = 39;
    exports.singleQuote = singleQuote;
    var doubleQuote = 34;
    exports.doubleQuote = doubleQuote;
    var slash = 47;
    exports.slash = slash;
    var bang = 33;
    exports.bang = bang;
    var backslash = 92;
    exports.backslash = backslash;
    var cr = 13;
    exports.cr = cr;
    var feed = 12;
    exports.feed = feed;
    var newline = 10;
    exports.newline = newline;
    var tab = 9;
    exports.tab = tab;
    var str = singleQuote;
    exports.str = str;
    var comment2 = -1;
    exports.comment = comment2;
    var word = -2;
    exports.word = word;
    var combinator = -3;
    exports.combinator = combinator;
  }
});

// node_modules/postcss-selector-parser/dist/tokenize.js
var require_tokenize2 = __commonJS({
  "node_modules/postcss-selector-parser/dist/tokenize.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = tokenize;
    exports.FIELDS = void 0;
    var t = _interopRequireWildcard(require_tokenTypes());
    var _unescapable;
    var _wordDelimiters;
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var unescapable = (_unescapable = {}, _unescapable[t.tab] = true, _unescapable[t.newline] = true, _unescapable[t.cr] = true, _unescapable[t.feed] = true, _unescapable);
    var wordDelimiters = (_wordDelimiters = {}, _wordDelimiters[t.space] = true, _wordDelimiters[t.tab] = true, _wordDelimiters[t.newline] = true, _wordDelimiters[t.cr] = true, _wordDelimiters[t.feed] = true, _wordDelimiters[t.ampersand] = true, _wordDelimiters[t.asterisk] = true, _wordDelimiters[t.bang] = true, _wordDelimiters[t.comma] = true, _wordDelimiters[t.colon] = true, _wordDelimiters[t.semicolon] = true, _wordDelimiters[t.openParenthesis] = true, _wordDelimiters[t.closeParenthesis] = true, _wordDelimiters[t.openSquare] = true, _wordDelimiters[t.closeSquare] = true, _wordDelimiters[t.singleQuote] = true, _wordDelimiters[t.doubleQuote] = true, _wordDelimiters[t.plus] = true, _wordDelimiters[t.pipe] = true, _wordDelimiters[t.tilde] = true, _wordDelimiters[t.greaterThan] = true, _wordDelimiters[t.equals] = true, _wordDelimiters[t.dollar] = true, _wordDelimiters[t.caret] = true, _wordDelimiters[t.slash] = true, _wordDelimiters);
    var hex = {};
    var hexChars = "0123456789abcdefABCDEF";
    for (i = 0; i < hexChars.length; i++) {
      hex[hexChars.charCodeAt(i)] = true;
    }
    var i;
    function consumeWord(css, start) {
      var next = start;
      var code;
      do {
        code = css.charCodeAt(next);
        if (wordDelimiters[code]) {
          return next - 1;
        } else if (code === t.backslash) {
          next = consumeEscape(css, next) + 1;
        } else {
          next++;
        }
      } while (next < css.length);
      return next - 1;
    }
    function consumeEscape(css, start) {
      var next = start;
      var code = css.charCodeAt(next + 1);
      if (unescapable[code]) {
      } else if (hex[code]) {
        var hexDigits = 0;
        do {
          next++;
          hexDigits++;
          code = css.charCodeAt(next + 1);
        } while (hex[code] && hexDigits < 6);
        if (hexDigits < 6 && code === t.space) {
          next++;
        }
      } else {
        next++;
      }
      return next;
    }
    var FIELDS = {
      TYPE: 0,
      START_LINE: 1,
      START_COL: 2,
      END_LINE: 3,
      END_COL: 4,
      START_POS: 5,
      END_POS: 6
    };
    exports.FIELDS = FIELDS;
    function tokenize(input) {
      var tokens = [];
      var css = input.css.valueOf();
      var _css = css, length = _css.length;
      var offset = -1;
      var line = 1;
      var start = 0;
      var end = 0;
      var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;
      function unclosed(what, fix) {
        if (input.safe) {
          css += fix;
          next = css.length - 1;
        } else {
          throw input.error("Unclosed " + what, line, start - offset, start);
        }
      }
      while (start < length) {
        code = css.charCodeAt(start);
        if (code === t.newline) {
          offset = start;
          line += 1;
        }
        switch (code) {
          case t.space:
          case t.tab:
          case t.newline:
          case t.cr:
          case t.feed:
            next = start;
            do {
              next += 1;
              code = css.charCodeAt(next);
              if (code === t.newline) {
                offset = next;
                line += 1;
              }
            } while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);
            tokenType = t.space;
            endLine = line;
            endColumn = next - offset - 1;
            end = next;
            break;
          case t.plus:
          case t.greaterThan:
          case t.tilde:
          case t.pipe:
            next = start;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);
            tokenType = t.combinator;
            endLine = line;
            endColumn = start - offset;
            end = next;
            break;
          case t.asterisk:
          case t.ampersand:
          case t.bang:
          case t.comma:
          case t.equals:
          case t.dollar:
          case t.caret:
          case t.openSquare:
          case t.closeSquare:
          case t.colon:
          case t.semicolon:
          case t.openParenthesis:
          case t.closeParenthesis:
            next = start;
            tokenType = code;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
            break;
          case t.singleQuote:
          case t.doubleQuote:
            quote = code === t.singleQuote ? "'" : '"';
            next = start;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                unclosed("quote", quote);
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === t.backslash) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            tokenType = t.str;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
            break;
          default:
            if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
              next = css.indexOf("*/", start + 2) + 1;
              if (next === 0) {
                unclosed("comment", "*/");
              }
              content = css.slice(start, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              tokenType = t.comment;
              line = nextLine;
              endLine = nextLine;
              endColumn = next - nextOffset;
            } else if (code === t.slash) {
              next = start;
              tokenType = code;
              endLine = line;
              endColumn = start - offset;
              end = next + 1;
            } else {
              next = consumeWord(css, start);
              tokenType = t.word;
              endLine = line;
              endColumn = next - offset;
            }
            end = next + 1;
            break;
        }
        tokens.push([
          tokenType,
          line,
          start - offset,
          endLine,
          endColumn,
          start,
          end
        ]);
        if (nextOffset) {
          offset = nextOffset;
          nextOffset = null;
        }
        start = end;
      }
      return tokens;
    }
  }
});

// node_modules/postcss-selector-parser/dist/parser.js
var require_parser2 = __commonJS({
  "node_modules/postcss-selector-parser/dist/parser.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _root = _interopRequireDefault(require_root2());
    var _selector = _interopRequireDefault(require_selector());
    var _className = _interopRequireDefault(require_className());
    var _comment = _interopRequireDefault(require_comment2());
    var _id = _interopRequireDefault(require_id());
    var _tag = _interopRequireDefault(require_tag());
    var _string = _interopRequireDefault(require_string());
    var _pseudo = _interopRequireDefault(require_pseudo());
    var _attribute = _interopRequireWildcard(require_attribute());
    var _universal = _interopRequireDefault(require_universal());
    var _combinator = _interopRequireDefault(require_combinator());
    var _nesting = _interopRequireDefault(require_nesting());
    var _sortAscending = _interopRequireDefault(require_sortAscending());
    var _tokenize = _interopRequireWildcard(require_tokenize2());
    var tokens = _interopRequireWildcard(require_tokenTypes());
    var types = _interopRequireWildcard(require_types());
    var _util = require_util2();
    var _WHITESPACE_TOKENS;
    var _Object$assign;
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);
    var WHITESPACE_EQUIV_TOKENS = Object.assign({}, WHITESPACE_TOKENS, (_Object$assign = {}, _Object$assign[tokens.comment] = true, _Object$assign));
    function tokenStart(token) {
      return {
        line: token[_tokenize.FIELDS.START_LINE],
        column: token[_tokenize.FIELDS.START_COL]
      };
    }
    function tokenEnd(token) {
      return {
        line: token[_tokenize.FIELDS.END_LINE],
        column: token[_tokenize.FIELDS.END_COL]
      };
    }
    function getSource(startLine, startColumn, endLine, endColumn) {
      return {
        start: {
          line: startLine,
          column: startColumn
        },
        end: {
          line: endLine,
          column: endColumn
        }
      };
    }
    function getTokenSource(token) {
      return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
    }
    function getTokenSourceSpan(startToken, endToken) {
      if (!startToken) {
        return void 0;
      }
      return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
    }
    function unescapeProp(node, prop) {
      var value = node[prop];
      if (typeof value !== "string") {
        return;
      }
      if (value.indexOf("\\") !== -1) {
        (0, _util.ensureObject)(node, "raws");
        node[prop] = (0, _util.unesc)(value);
        if (node.raws[prop] === void 0) {
          node.raws[prop] = value;
        }
      }
      return node;
    }
    function indexesOf(array, item) {
      var i = -1;
      var indexes = [];
      while ((i = array.indexOf(item, i + 1)) !== -1) {
        indexes.push(i);
      }
      return indexes;
    }
    function uniqs() {
      var list2 = Array.prototype.concat.apply([], arguments);
      return list2.filter(function(item, i) {
        return i === list2.indexOf(item);
      });
    }
    var Parser = /* @__PURE__ */ function() {
      function Parser2(rule2, options) {
        if (options === void 0) {
          options = {};
        }
        this.rule = rule2;
        this.options = Object.assign({
          lossy: false,
          safe: false
        }, options);
        this.position = 0;
        this.css = typeof this.rule === "string" ? this.rule : this.rule.selector;
        this.tokens = (0, _tokenize["default"])({
          css: this.css,
          error: this._errorGenerator(),
          safe: this.options.safe
        });
        var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
        this.root = new _root["default"]({
          source: rootSource
        });
        this.root.errorGenerator = this._errorGenerator();
        var selector = new _selector["default"]({
          source: {
            start: {
              line: 1,
              column: 1
            }
          }
        });
        this.root.append(selector);
        this.current = selector;
        this.loop();
      }
      var _proto = Parser2.prototype;
      _proto._errorGenerator = function _errorGenerator() {
        var _this = this;
        return function(message, errorOptions) {
          if (typeof _this.rule === "string") {
            return new Error(message);
          }
          return _this.rule.error(message, errorOptions);
        };
      };
      _proto.attribute = function attribute() {
        var attr = [];
        var startingToken = this.currToken;
        this.position++;
        while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
          attr.push(this.currToken);
          this.position++;
        }
        if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
          return this.expected("closing square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
        }
        var len = attr.length;
        var node = {
          source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
          sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
        };
        if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) {
          return this.expected("attribute", attr[0][_tokenize.FIELDS.START_POS]);
        }
        var pos = 0;
        var spaceBefore = "";
        var commentBefore = "";
        var lastAdded = null;
        var spaceAfterMeaningfulToken = false;
        while (pos < len) {
          var token = attr[pos];
          var content = this.content(token);
          var next = attr[pos + 1];
          switch (token[_tokenize.FIELDS.TYPE]) {
            case tokens.space:
              spaceAfterMeaningfulToken = true;
              if (this.options.lossy) {
                break;
              }
              if (lastAdded) {
                (0, _util.ensureObject)(node, "spaces", lastAdded);
                var prevContent = node.spaces[lastAdded].after || "";
                node.spaces[lastAdded].after = prevContent + content;
                var existingComment = (0, _util.getProp)(node, "raws", "spaces", lastAdded, "after") || null;
                if (existingComment) {
                  node.raws.spaces[lastAdded].after = existingComment + content;
                }
              } else {
                spaceBefore = spaceBefore + content;
                commentBefore = commentBefore + content;
              }
              break;
            case tokens.asterisk:
              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = "operator";
              } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
                if (spaceBefore) {
                  (0, _util.ensureObject)(node, "spaces", "attribute");
                  node.spaces.attribute.before = spaceBefore;
                  spaceBefore = "";
                }
                if (commentBefore) {
                  (0, _util.ensureObject)(node, "raws", "spaces", "attribute");
                  node.raws.spaces.attribute.before = spaceBefore;
                  commentBefore = "";
                }
                node.namespace = (node.namespace || "") + content;
                var rawValue = (0, _util.getProp)(node, "raws", "namespace") || null;
                if (rawValue) {
                  node.raws.namespace += content;
                }
                lastAdded = "namespace";
              }
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.dollar:
              if (lastAdded === "value") {
                var oldRawValue = (0, _util.getProp)(node, "raws", "value");
                node.value += "$";
                if (oldRawValue) {
                  node.raws.value = oldRawValue + "$";
                }
                break;
              }
            case tokens.caret:
              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = "operator";
              }
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.combinator:
              if (content === "~" && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = "operator";
              }
              if (content !== "|") {
                spaceAfterMeaningfulToken = false;
                break;
              }
              if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                node.operator = content;
                lastAdded = "operator";
              } else if (!node.namespace && !node.attribute) {
                node.namespace = true;
              }
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.word:
              if (next && this.content(next) === "|" && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals && !node.operator && !node.namespace) {
                node.namespace = content;
                lastAdded = "namespace";
              } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
                if (spaceBefore) {
                  (0, _util.ensureObject)(node, "spaces", "attribute");
                  node.spaces.attribute.before = spaceBefore;
                  spaceBefore = "";
                }
                if (commentBefore) {
                  (0, _util.ensureObject)(node, "raws", "spaces", "attribute");
                  node.raws.spaces.attribute.before = commentBefore;
                  commentBefore = "";
                }
                node.attribute = (node.attribute || "") + content;
                var _rawValue = (0, _util.getProp)(node, "raws", "attribute") || null;
                if (_rawValue) {
                  node.raws.attribute += content;
                }
                lastAdded = "attribute";
              } else if (!node.value && node.value !== "" || lastAdded === "value" && !(spaceAfterMeaningfulToken || node.quoteMark)) {
                var _unescaped = (0, _util.unesc)(content);
                var _oldRawValue = (0, _util.getProp)(node, "raws", "value") || "";
                var oldValue = node.value || "";
                node.value = oldValue + _unescaped;
                node.quoteMark = null;
                if (_unescaped !== content || _oldRawValue) {
                  (0, _util.ensureObject)(node, "raws");
                  node.raws.value = (_oldRawValue || oldValue) + content;
                }
                lastAdded = "value";
              } else {
                var insensitive = content === "i" || content === "I";
                if ((node.value || node.value === "") && (node.quoteMark || spaceAfterMeaningfulToken)) {
                  node.insensitive = insensitive;
                  if (!insensitive || content === "I") {
                    (0, _util.ensureObject)(node, "raws");
                    node.raws.insensitiveFlag = content;
                  }
                  lastAdded = "insensitive";
                  if (spaceBefore) {
                    (0, _util.ensureObject)(node, "spaces", "insensitive");
                    node.spaces.insensitive.before = spaceBefore;
                    spaceBefore = "";
                  }
                  if (commentBefore) {
                    (0, _util.ensureObject)(node, "raws", "spaces", "insensitive");
                    node.raws.spaces.insensitive.before = commentBefore;
                    commentBefore = "";
                  }
                } else if (node.value || node.value === "") {
                  lastAdded = "value";
                  node.value += content;
                  if (node.raws.value) {
                    node.raws.value += content;
                  }
                }
              }
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.str:
              if (!node.attribute || !node.operator) {
                return this.error("Expected an attribute followed by an operator preceding the string.", {
                  index: token[_tokenize.FIELDS.START_POS]
                });
              }
              var _unescapeValue = (0, _attribute.unescapeValue)(content), unescaped = _unescapeValue.unescaped, quoteMark = _unescapeValue.quoteMark;
              node.value = unescaped;
              node.quoteMark = quoteMark;
              lastAdded = "value";
              (0, _util.ensureObject)(node, "raws");
              node.raws.value = content;
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.equals:
              if (!node.attribute) {
                return this.expected("attribute", token[_tokenize.FIELDS.START_POS], content);
              }
              if (node.value) {
                return this.error('Unexpected "=" found; an operator was already defined.', {
                  index: token[_tokenize.FIELDS.START_POS]
                });
              }
              node.operator = node.operator ? node.operator + content : content;
              lastAdded = "operator";
              spaceAfterMeaningfulToken = false;
              break;
            case tokens.comment:
              if (lastAdded) {
                if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === "insensitive") {
                  var lastComment = (0, _util.getProp)(node, "spaces", lastAdded, "after") || "";
                  var rawLastComment = (0, _util.getProp)(node, "raws", "spaces", lastAdded, "after") || lastComment;
                  (0, _util.ensureObject)(node, "raws", "spaces", lastAdded);
                  node.raws.spaces[lastAdded].after = rawLastComment + content;
                } else {
                  var lastValue = node[lastAdded] || "";
                  var rawLastValue = (0, _util.getProp)(node, "raws", lastAdded) || lastValue;
                  (0, _util.ensureObject)(node, "raws");
                  node.raws[lastAdded] = rawLastValue + content;
                }
              } else {
                commentBefore = commentBefore + content;
              }
              break;
            default:
              return this.error('Unexpected "' + content + '" found.', {
                index: token[_tokenize.FIELDS.START_POS]
              });
          }
          pos++;
        }
        unescapeProp(node, "attribute");
        unescapeProp(node, "namespace");
        this.newNode(new _attribute["default"](node));
        this.position++;
      };
      _proto.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
        if (stopPosition < 0) {
          stopPosition = this.tokens.length;
        }
        var startPosition = this.position;
        var nodes = [];
        var space = "";
        var lastComment = void 0;
        do {
          if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
            if (!this.options.lossy) {
              space += this.content();
            }
          } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
            var spaces = {};
            if (space) {
              spaces.before = space;
              space = "";
            }
            lastComment = new _comment["default"]({
              value: this.content(),
              source: getTokenSource(this.currToken),
              sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
              spaces
            });
            nodes.push(lastComment);
          }
        } while (++this.position < stopPosition);
        if (space) {
          if (lastComment) {
            lastComment.spaces.after = space;
          } else if (!this.options.lossy) {
            var firstToken = this.tokens[startPosition];
            var lastToken = this.tokens[this.position - 1];
            nodes.push(new _string["default"]({
              value: "",
              source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
              sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
              spaces: {
                before: space,
                after: ""
              }
            }));
          }
        }
        return nodes;
      };
      _proto.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes, requiredSpace) {
        var _this2 = this;
        if (requiredSpace === void 0) {
          requiredSpace = false;
        }
        var space = "";
        var rawSpace = "";
        nodes.forEach(function(n) {
          var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);
          var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);
          space += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
          rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
        });
        if (rawSpace === space) {
          rawSpace = void 0;
        }
        var result = {
          space,
          rawSpace
        };
        return result;
      };
      _proto.isNamedCombinator = function isNamedCombinator(position) {
        if (position === void 0) {
          position = this.position;
        }
        return this.tokens[position + 0] && this.tokens[position + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
      };
      _proto.namedCombinator = function namedCombinator() {
        if (this.isNamedCombinator()) {
          var nameRaw = this.content(this.tokens[this.position + 1]);
          var name = (0, _util.unesc)(nameRaw).toLowerCase();
          var raws = {};
          if (name !== nameRaw) {
            raws.value = "/" + nameRaw + "/";
          }
          var node = new _combinator["default"]({
            value: "/" + name + "/",
            source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
            sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
            raws
          });
          this.position = this.position + 3;
          return node;
        } else {
          this.unexpected();
        }
      };
      _proto.combinator = function combinator() {
        var _this3 = this;
        if (this.content() === "|") {
          return this.namespace();
        }
        var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);
        if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma) {
          var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
          if (nodes.length > 0) {
            var last = this.current.last;
            if (last) {
              var _this$convertWhitespa = this.convertWhitespaceNodesToSpace(nodes), space = _this$convertWhitespa.space, rawSpace = _this$convertWhitespa.rawSpace;
              if (rawSpace !== void 0) {
                last.rawSpaceAfter += rawSpace;
              }
              last.spaces.after += space;
            } else {
              nodes.forEach(function(n) {
                return _this3.newNode(n);
              });
            }
          }
          return;
        }
        var firstToken = this.currToken;
        var spaceOrDescendantSelectorNodes = void 0;
        if (nextSigTokenPos > this.position) {
          spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
        }
        var node;
        if (this.isNamedCombinator()) {
          node = this.namedCombinator();
        } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
          node = new _combinator["default"]({
            value: this.content(),
            source: getTokenSource(this.currToken),
            sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
          });
          this.position++;
        } else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
        } else if (!spaceOrDescendantSelectorNodes) {
          this.unexpected();
        }
        if (node) {
          if (spaceOrDescendantSelectorNodes) {
            var _this$convertWhitespa2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes), _space = _this$convertWhitespa2.space, _rawSpace = _this$convertWhitespa2.rawSpace;
            node.spaces.before = _space;
            node.rawSpaceBefore = _rawSpace;
          }
        } else {
          var _this$convertWhitespa3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true), _space2 = _this$convertWhitespa3.space, _rawSpace2 = _this$convertWhitespa3.rawSpace;
          if (!_rawSpace2) {
            _rawSpace2 = _space2;
          }
          var spaces = {};
          var raws = {
            spaces: {}
          };
          if (_space2.endsWith(" ") && _rawSpace2.endsWith(" ")) {
            spaces.before = _space2.slice(0, _space2.length - 1);
            raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
          } else if (_space2.startsWith(" ") && _rawSpace2.startsWith(" ")) {
            spaces.after = _space2.slice(1);
            raws.spaces.after = _rawSpace2.slice(1);
          } else {
            raws.value = _rawSpace2;
          }
          node = new _combinator["default"]({
            value: " ",
            source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
            sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
            spaces,
            raws
          });
        }
        if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
          node.spaces.after = this.optionalSpace(this.content());
          this.position++;
        }
        return this.newNode(node);
      };
      _proto.comma = function comma() {
        if (this.position === this.tokens.length - 1) {
          this.root.trailingComma = true;
          this.position++;
          return;
        }
        this.current._inferEndPosition();
        var selector = new _selector["default"]({
          source: {
            start: tokenStart(this.tokens[this.position + 1])
          }
        });
        this.current.parent.append(selector);
        this.current = selector;
        this.position++;
      };
      _proto.comment = function comment2() {
        var current = this.currToken;
        this.newNode(new _comment["default"]({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };
      _proto.error = function error(message, opts) {
        throw this.root.error(message, opts);
      };
      _proto.missingBackslash = function missingBackslash() {
        return this.error("Expected a backslash preceding the semicolon.", {
          index: this.currToken[_tokenize.FIELDS.START_POS]
        });
      };
      _proto.missingParenthesis = function missingParenthesis() {
        return this.expected("opening parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
      };
      _proto.missingSquareBracket = function missingSquareBracket() {
        return this.expected("opening square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
      };
      _proto.unexpected = function unexpected() {
        return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[_tokenize.FIELDS.START_POS]);
      };
      _proto.namespace = function namespace() {
        var before = this.prevToken && this.content(this.prevToken) || true;
        if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
          this.position++;
          return this.word(before);
        } else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
          this.position++;
          return this.universal(before);
        }
      };
      _proto.nesting = function nesting() {
        if (this.nextToken) {
          var nextContent = this.content(this.nextToken);
          if (nextContent === "|") {
            this.position++;
            return;
          }
        }
        var current = this.currToken;
        this.newNode(new _nesting["default"]({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };
      _proto.parentheses = function parentheses() {
        var last = this.current.last;
        var unbalanced = 1;
        this.position++;
        if (last && last.type === types.PSEUDO) {
          var selector = new _selector["default"]({
            source: {
              start: tokenStart(this.tokens[this.position - 1])
            }
          });
          var cache = this.current;
          last.append(selector);
          this.current = selector;
          while (this.position < this.tokens.length && unbalanced) {
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              unbalanced++;
            }
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
              unbalanced--;
            }
            if (unbalanced) {
              this.parse();
            } else {
              this.current.source.end = tokenEnd(this.currToken);
              this.current.parent.source.end = tokenEnd(this.currToken);
              this.position++;
            }
          }
          this.current = cache;
        } else {
          var parenStart = this.currToken;
          var parenValue = "(";
          var parenEnd;
          while (this.position < this.tokens.length && unbalanced) {
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              unbalanced++;
            }
            if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
              unbalanced--;
            }
            parenEnd = this.currToken;
            parenValue += this.parseParenthesisToken(this.currToken);
            this.position++;
          }
          if (last) {
            last.appendToPropertyAndEscape("value", parenValue, parenValue);
          } else {
            this.newNode(new _string["default"]({
              value: parenValue,
              source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
              sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
            }));
          }
        }
        if (unbalanced) {
          return this.expected("closing parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
        }
      };
      _proto.pseudo = function pseudo() {
        var _this4 = this;
        var pseudoStr = "";
        var startingToken = this.currToken;
        while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
          pseudoStr += this.content();
          this.position++;
        }
        if (!this.currToken) {
          return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
        }
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) {
          this.splitWord(false, function(first, length) {
            pseudoStr += first;
            _this4.newNode(new _pseudo["default"]({
              value: pseudoStr,
              source: getTokenSourceSpan(startingToken, _this4.currToken),
              sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
            }));
            if (length > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
              _this4.error("Misplaced parenthesis.", {
                index: _this4.nextToken[_tokenize.FIELDS.START_POS]
              });
            }
          });
        } else {
          return this.expected(["pseudo-class", "pseudo-element"], this.currToken[_tokenize.FIELDS.START_POS]);
        }
      };
      _proto.space = function space() {
        var content = this.content();
        if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis || this.current.nodes.every(function(node) {
          return node.type === "comment";
        })) {
          this.spaces = this.optionalSpace(content);
          this.position++;
        } else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
          this.current.last.spaces.after = this.optionalSpace(content);
          this.position++;
        } else {
          this.combinator();
        }
      };
      _proto.string = function string() {
        var current = this.currToken;
        this.newNode(new _string["default"]({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
      };
      _proto.universal = function universal(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && this.content(nextToken) === "|") {
          this.position++;
          return this.namespace();
        }
        var current = this.currToken;
        this.newNode(new _universal["default"]({
          value: this.content(),
          source: getTokenSource(current),
          sourceIndex: current[_tokenize.FIELDS.START_POS]
        }), namespace);
        this.position++;
      };
      _proto.splitWord = function splitWord(namespace, firstCallback) {
        var _this5 = this;
        var nextToken = this.nextToken;
        var word = this.content();
        while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
          this.position++;
          var current = this.content();
          word += current;
          if (current.lastIndexOf("\\") === current.length - 1) {
            var next = this.nextToken;
            if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
              word += this.requiredSpace(this.content(next));
              this.position++;
            }
          }
          nextToken = this.nextToken;
        }
        var hasClass = indexesOf(word, ".").filter(function(i) {
          var escapedDot = word[i - 1] === "\\";
          var isKeyframesPercent = /^\d+\.\d+%$/.test(word);
          return !escapedDot && !isKeyframesPercent;
        });
        var hasId = indexesOf(word, "#").filter(function(i) {
          return word[i - 1] !== "\\";
        });
        var interpolations = indexesOf(word, "#{");
        if (interpolations.length) {
          hasId = hasId.filter(function(hashIndex) {
            return !~interpolations.indexOf(hashIndex);
          });
        }
        var indices = (0, _sortAscending["default"])(uniqs([0].concat(hasClass, hasId)));
        indices.forEach(function(ind, i) {
          var index = indices[i + 1] || word.length;
          var value = word.slice(ind, index);
          if (i === 0 && firstCallback) {
            return firstCallback.call(_this5, value, indices.length);
          }
          var node;
          var current2 = _this5.currToken;
          var sourceIndex = current2[_tokenize.FIELDS.START_POS] + indices[i];
          var source = getSource(current2[1], current2[2] + ind, current2[3], current2[2] + (index - 1));
          if (~hasClass.indexOf(ind)) {
            var classNameOpts = {
              value: value.slice(1),
              source,
              sourceIndex
            };
            node = new _className["default"](unescapeProp(classNameOpts, "value"));
          } else if (~hasId.indexOf(ind)) {
            var idOpts = {
              value: value.slice(1),
              source,
              sourceIndex
            };
            node = new _id["default"](unescapeProp(idOpts, "value"));
          } else {
            var tagOpts = {
              value,
              source,
              sourceIndex
            };
            unescapeProp(tagOpts, "value");
            node = new _tag["default"](tagOpts);
          }
          _this5.newNode(node, namespace);
          namespace = null;
        });
        this.position++;
      };
      _proto.word = function word(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && this.content(nextToken) === "|") {
          this.position++;
          return this.namespace();
        }
        return this.splitWord(namespace);
      };
      _proto.loop = function loop() {
        while (this.position < this.tokens.length) {
          this.parse(true);
        }
        this.current._inferEndPosition();
        return this.root;
      };
      _proto.parse = function parse2(throwOnParenthesis) {
        switch (this.currToken[_tokenize.FIELDS.TYPE]) {
          case tokens.space:
            this.space();
            break;
          case tokens.comment:
            this.comment();
            break;
          case tokens.openParenthesis:
            this.parentheses();
            break;
          case tokens.closeParenthesis:
            if (throwOnParenthesis) {
              this.missingParenthesis();
            }
            break;
          case tokens.openSquare:
            this.attribute();
            break;
          case tokens.dollar:
          case tokens.caret:
          case tokens.equals:
          case tokens.word:
            this.word();
            break;
          case tokens.colon:
            this.pseudo();
            break;
          case tokens.comma:
            this.comma();
            break;
          case tokens.asterisk:
            this.universal();
            break;
          case tokens.ampersand:
            this.nesting();
            break;
          case tokens.slash:
          case tokens.combinator:
            this.combinator();
            break;
          case tokens.str:
            this.string();
            break;
          case tokens.closeSquare:
            this.missingSquareBracket();
          case tokens.semicolon:
            this.missingBackslash();
          default:
            this.unexpected();
        }
      };
      _proto.expected = function expected(description, index, found) {
        if (Array.isArray(description)) {
          var last = description.pop();
          description = description.join(", ") + " or " + last;
        }
        var an = /^[aeiou]/.test(description[0]) ? "an" : "a";
        if (!found) {
          return this.error("Expected " + an + " " + description + ".", {
            index
          });
        }
        return this.error("Expected " + an + " " + description + ', found "' + found + '" instead.', {
          index
        });
      };
      _proto.requiredSpace = function requiredSpace(space) {
        return this.options.lossy ? " " : space;
      };
      _proto.optionalSpace = function optionalSpace(space) {
        return this.options.lossy ? "" : space;
      };
      _proto.lossySpace = function lossySpace(space, required) {
        if (this.options.lossy) {
          return required ? " " : "";
        } else {
          return space;
        }
      };
      _proto.parseParenthesisToken = function parseParenthesisToken(token) {
        var content = this.content(token);
        if (token[_tokenize.FIELDS.TYPE] === tokens.space) {
          return this.requiredSpace(content);
        } else {
          return content;
        }
      };
      _proto.newNode = function newNode(node, namespace) {
        if (namespace) {
          if (/^ +$/.test(namespace)) {
            if (!this.options.lossy) {
              this.spaces = (this.spaces || "") + namespace;
            }
            namespace = true;
          }
          node.namespace = namespace;
          unescapeProp(node, "namespace");
        }
        if (this.spaces) {
          node.spaces.before = this.spaces;
          this.spaces = "";
        }
        return this.current.append(node);
      };
      _proto.content = function content(token) {
        if (token === void 0) {
          token = this.currToken;
        }
        return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
      };
      _proto.locateNextMeaningfulToken = function locateNextMeaningfulToken(startPosition) {
        if (startPosition === void 0) {
          startPosition = this.position + 1;
        }
        var searchPosition = startPosition;
        while (searchPosition < this.tokens.length) {
          if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
            searchPosition++;
            continue;
          } else {
            return searchPosition;
          }
        }
        return -1;
      };
      _createClass(Parser2, [{
        key: "currToken",
        get: function get() {
          return this.tokens[this.position];
        }
      }, {
        key: "nextToken",
        get: function get() {
          return this.tokens[this.position + 1];
        }
      }, {
        key: "prevToken",
        get: function get() {
          return this.tokens[this.position - 1];
        }
      }]);
      return Parser2;
    }();
    exports["default"] = Parser;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/processor.js
var require_processor2 = __commonJS({
  "node_modules/postcss-selector-parser/dist/processor.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _parser = _interopRequireDefault(require_parser2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var Processor2 = /* @__PURE__ */ function() {
      function Processor3(func, options) {
        this.func = func || function noop() {
        };
        this.funcRes = null;
        this.options = options;
      }
      var _proto = Processor3.prototype;
      _proto._shouldUpdateSelector = function _shouldUpdateSelector(rule2, options) {
        if (options === void 0) {
          options = {};
        }
        var merged = Object.assign({}, this.options, options);
        if (merged.updateSelector === false) {
          return false;
        } else {
          return typeof rule2 !== "string";
        }
      };
      _proto._isLossy = function _isLossy(options) {
        if (options === void 0) {
          options = {};
        }
        var merged = Object.assign({}, this.options, options);
        if (merged.lossless === false) {
          return true;
        } else {
          return false;
        }
      };
      _proto._root = function _root(rule2, options) {
        if (options === void 0) {
          options = {};
        }
        var parser = new _parser["default"](rule2, this._parseOptions(options));
        return parser.root;
      };
      _proto._parseOptions = function _parseOptions(options) {
        return {
          lossy: this._isLossy(options)
        };
      };
      _proto._run = function _run(rule2, options) {
        var _this = this;
        if (options === void 0) {
          options = {};
        }
        return new Promise(function(resolve, reject) {
          try {
            var root2 = _this._root(rule2, options);
            Promise.resolve(_this.func(root2)).then(function(transform) {
              var string = void 0;
              if (_this._shouldUpdateSelector(rule2, options)) {
                string = root2.toString();
                rule2.selector = string;
              }
              return {
                transform,
                root: root2,
                string
              };
            }).then(resolve, reject);
          } catch (e) {
            reject(e);
            return;
          }
        });
      };
      _proto._runSync = function _runSync(rule2, options) {
        if (options === void 0) {
          options = {};
        }
        var root2 = this._root(rule2, options);
        var transform = this.func(root2);
        if (transform && typeof transform.then === "function") {
          throw new Error("Selector processor returned a promise to a synchronous call.");
        }
        var string = void 0;
        if (options.updateSelector && typeof rule2 !== "string") {
          string = root2.toString();
          rule2.selector = string;
        }
        return {
          transform,
          root: root2,
          string
        };
      };
      _proto.ast = function ast(rule2, options) {
        return this._run(rule2, options).then(function(result) {
          return result.root;
        });
      };
      _proto.astSync = function astSync(rule2, options) {
        return this._runSync(rule2, options).root;
      };
      _proto.transform = function transform(rule2, options) {
        return this._run(rule2, options).then(function(result) {
          return result.transform;
        });
      };
      _proto.transformSync = function transformSync(rule2, options) {
        return this._runSync(rule2, options).transform;
      };
      _proto.process = function process3(rule2, options) {
        return this._run(rule2, options).then(function(result) {
          return result.string || result.root.toString();
        });
      };
      _proto.processSync = function processSync(rule2, options) {
        var result = this._runSync(rule2, options);
        return result.string || result.root.toString();
      };
      return Processor3;
    }();
    exports["default"] = Processor2;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/constructors.js
var require_constructors = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/constructors.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;
    var _attribute = _interopRequireDefault(require_attribute());
    var _className = _interopRequireDefault(require_className());
    var _combinator = _interopRequireDefault(require_combinator());
    var _comment = _interopRequireDefault(require_comment2());
    var _id = _interopRequireDefault(require_id());
    var _nesting = _interopRequireDefault(require_nesting());
    var _pseudo = _interopRequireDefault(require_pseudo());
    var _root = _interopRequireDefault(require_root2());
    var _selector = _interopRequireDefault(require_selector());
    var _string = _interopRequireDefault(require_string());
    var _tag = _interopRequireDefault(require_tag());
    var _universal = _interopRequireDefault(require_universal());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var attribute = function attribute2(opts) {
      return new _attribute["default"](opts);
    };
    exports.attribute = attribute;
    var className = function className2(opts) {
      return new _className["default"](opts);
    };
    exports.className = className;
    var combinator = function combinator2(opts) {
      return new _combinator["default"](opts);
    };
    exports.combinator = combinator;
    var comment2 = function comment3(opts) {
      return new _comment["default"](opts);
    };
    exports.comment = comment2;
    var id = function id2(opts) {
      return new _id["default"](opts);
    };
    exports.id = id;
    var nesting = function nesting2(opts) {
      return new _nesting["default"](opts);
    };
    exports.nesting = nesting;
    var pseudo = function pseudo2(opts) {
      return new _pseudo["default"](opts);
    };
    exports.pseudo = pseudo;
    var root2 = function root3(opts) {
      return new _root["default"](opts);
    };
    exports.root = root2;
    var selector = function selector2(opts) {
      return new _selector["default"](opts);
    };
    exports.selector = selector;
    var string = function string2(opts) {
      return new _string["default"](opts);
    };
    exports.string = string;
    var tag = function tag2(opts) {
      return new _tag["default"](opts);
    };
    exports.tag = tag;
    var universal = function universal2(opts) {
      return new _universal["default"](opts);
    };
    exports.universal = universal;
  }
});

// node_modules/postcss-selector-parser/dist/selectors/guards.js
var require_guards = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/guards.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.isNode = isNode;
    exports.isPseudoElement = isPseudoElement;
    exports.isPseudoClass = isPseudoClass;
    exports.isContainer = isContainer;
    exports.isNamespace = isNamespace;
    exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = exports.isPseudo = exports.isNesting = exports.isIdentifier = exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = void 0;
    var _types = require_types();
    var _IS_TYPE;
    var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);
    function isNode(node) {
      return typeof node === "object" && IS_TYPE[node.type];
    }
    function isNodeType(type, node) {
      return isNode(node) && node.type === type;
    }
    var isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
    exports.isAttribute = isAttribute;
    var isClassName = isNodeType.bind(null, _types.CLASS);
    exports.isClassName = isClassName;
    var isCombinator = isNodeType.bind(null, _types.COMBINATOR);
    exports.isCombinator = isCombinator;
    var isComment = isNodeType.bind(null, _types.COMMENT);
    exports.isComment = isComment;
    var isIdentifier = isNodeType.bind(null, _types.ID);
    exports.isIdentifier = isIdentifier;
    var isNesting = isNodeType.bind(null, _types.NESTING);
    exports.isNesting = isNesting;
    var isPseudo = isNodeType.bind(null, _types.PSEUDO);
    exports.isPseudo = isPseudo;
    var isRoot = isNodeType.bind(null, _types.ROOT);
    exports.isRoot = isRoot;
    var isSelector = isNodeType.bind(null, _types.SELECTOR);
    exports.isSelector = isSelector;
    var isString = isNodeType.bind(null, _types.STRING);
    exports.isString = isString;
    var isTag = isNodeType.bind(null, _types.TAG);
    exports.isTag = isTag;
    var isUniversal = isNodeType.bind(null, _types.UNIVERSAL);
    exports.isUniversal = isUniversal;
    function isPseudoElement(node) {
      return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value.toLowerCase() === ":before" || node.value.toLowerCase() === ":after" || node.value.toLowerCase() === ":first-letter" || node.value.toLowerCase() === ":first-line");
    }
    function isPseudoClass(node) {
      return isPseudo(node) && !isPseudoElement(node);
    }
    function isContainer(node) {
      return !!(isNode(node) && node.walk);
    }
    function isNamespace(node) {
      return isAttribute(node) || isTag(node);
    }
  }
});

// node_modules/postcss-selector-parser/dist/selectors/index.js
var require_selectors = __commonJS({
  "node_modules/postcss-selector-parser/dist/selectors/index.js"(exports) {
    "use strict";
    exports.__esModule = true;
    var _types = require_types();
    Object.keys(_types).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _types[key])
        return;
      exports[key] = _types[key];
    });
    var _constructors = require_constructors();
    Object.keys(_constructors).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _constructors[key])
        return;
      exports[key] = _constructors[key];
    });
    var _guards = require_guards();
    Object.keys(_guards).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (key in exports && exports[key] === _guards[key])
        return;
      exports[key] = _guards[key];
    });
  }
});

// node_modules/postcss-selector-parser/dist/index.js
var require_dist = __commonJS({
  "node_modules/postcss-selector-parser/dist/index.js"(exports, module2) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = void 0;
    var _processor = _interopRequireDefault(require_processor2());
    var selectors = _interopRequireWildcard(require_selectors());
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function _getRequireWildcardCache2() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { "default": obj };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj["default"] = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var parser = function parser2(processor) {
      return new _processor["default"](processor);
    };
    Object.assign(parser, selectors);
    delete parser.__esModule;
    var _default = parser;
    exports["default"] = _default;
    module2.exports = exports.default;
  }
});

// node_modules/postcss-nested/index.js
var require_postcss_nested = __commonJS({
  "node_modules/postcss-nested/index.js"(exports, module2) {
    var { Rule: Rule2, AtRule: AtRule2 } = require_postcss();
    var parser = require_dist();
    function parse2(rawSelector, rule2) {
      let nodes;
      try {
        parser((parsed) => {
          nodes = parsed;
        }).processSync(rawSelector);
      } catch (e) {
        if (rawSelector.includes(":")) {
          throw rule2 ? rule2.error("Missed semicolon") : e;
        } else {
          throw rule2 ? rule2.error(e.message) : e;
        }
      }
      return nodes.at(0);
    }
    function interpolateAmpInSelector(nodes, parent) {
      let replaced = false;
      nodes.each((node) => {
        if (node.type === "nesting") {
          let clonedParent = parent.clone({});
          if (node.value !== "&") {
            node.replaceWith(
              parse2(node.value.replace("&", clonedParent.toString()))
            );
          } else {
            node.replaceWith(clonedParent);
          }
          replaced = true;
        } else if ("nodes" in node && node.nodes) {
          if (interpolateAmpInSelector(node, parent)) {
            replaced = true;
          }
        }
      });
      return replaced;
    }
    function mergeSelectors(parent, child) {
      let merged = [];
      parent.selectors.forEach((sel) => {
        let parentNode = parse2(sel, parent);
        child.selectors.forEach((selector) => {
          if (!selector) {
            return;
          }
          let node = parse2(selector, child);
          let replaced = interpolateAmpInSelector(node, parentNode);
          if (!replaced) {
            node.prepend(parser.combinator({ value: " " }));
            node.prepend(parentNode.clone({}));
          }
          merged.push(node.toString());
        });
      });
      return merged;
    }
    function breakOut(child, after) {
      let prev = child.prev();
      after.after(child);
      while (prev && prev.type === "comment") {
        let nextPrev = prev.prev();
        after.after(prev);
        prev = nextPrev;
      }
      return child;
    }
    function createFnAtruleChilds(bubble) {
      return function atruleChilds(rule2, atrule, bubbling, mergeSels = bubbling) {
        let children = [];
        atrule.each((child) => {
          if (child.type === "rule" && bubbling) {
            if (mergeSels) {
              child.selectors = mergeSelectors(rule2, child);
            }
          } else if (child.type === "atrule" && child.nodes) {
            if (bubble[child.name]) {
              atruleChilds(rule2, child, mergeSels);
            } else if (atrule[rootRuleMergeSel] !== false) {
              children.push(child);
            }
          } else {
            children.push(child);
          }
        });
        if (bubbling) {
          if (children.length) {
            let clone = rule2.clone({ nodes: [] });
            for (let child of children) {
              clone.append(child);
            }
            atrule.prepend(clone);
          }
        }
      };
    }
    function pickDeclarations(selector, declarations, after) {
      let parent = new Rule2({
        selector,
        nodes: []
      });
      parent.append(declarations);
      after.after(parent);
      return parent;
    }
    function atruleNames(defaults, custom) {
      let list2 = {};
      for (let name of defaults) {
        list2[name] = true;
      }
      if (custom) {
        for (let name of custom) {
          list2[name.replace(/^@/, "")] = true;
        }
      }
      return list2;
    }
    function parseRootRuleParams(params) {
      params = params.trim();
      let braceBlock = params.match(/^\((.*)\)$/);
      if (!braceBlock) {
        return { type: "basic", selector: params };
      }
      let bits = braceBlock[1].match(/^(with(?:out)?):(.+)$/);
      if (bits) {
        let allowlist = bits[1] === "with";
        let rules = Object.fromEntries(
          bits[2].trim().split(/\s+/).map((name) => [name, true])
        );
        if (allowlist && rules.all) {
          return { type: "noop" };
        }
        let escapes = (rule2) => !!rules[rule2];
        if (rules.all) {
          escapes = () => true;
        } else if (allowlist) {
          escapes = (rule2) => rule2 === "all" ? false : !rules[rule2];
        }
        return {
          type: "withrules",
          escapes
        };
      }
      return { type: "unknown" };
    }
    function getAncestorRules(leaf) {
      let lineage = [];
      let parent = leaf.parent;
      while (parent && parent instanceof AtRule2) {
        lineage.push(parent);
        parent = parent.parent;
      }
      return lineage;
    }
    function unwrapRootRule(rule2) {
      let escapes = rule2[rootRuleEscapes];
      if (!escapes) {
        rule2.after(rule2.nodes);
      } else {
        let nodes = rule2.nodes;
        let topEscaped;
        let topEscapedIdx = -1;
        let breakoutLeaf;
        let breakoutRoot;
        let clone;
        let lineage = getAncestorRules(rule2);
        lineage.forEach((parent, i) => {
          if (escapes(parent.name)) {
            topEscaped = parent;
            topEscapedIdx = i;
            breakoutRoot = clone;
          } else {
            let oldClone = clone;
            clone = parent.clone({ nodes: [] });
            oldClone && clone.append(oldClone);
            breakoutLeaf = breakoutLeaf || clone;
          }
        });
        if (!topEscaped) {
          rule2.after(nodes);
        } else if (!breakoutRoot) {
          topEscaped.after(nodes);
        } else {
          let leaf = breakoutLeaf;
          leaf.append(nodes);
          topEscaped.after(breakoutRoot);
        }
        if (rule2.next() && topEscaped) {
          let restRoot;
          lineage.slice(0, topEscapedIdx + 1).forEach((parent, i, arr) => {
            let oldRoot = restRoot;
            restRoot = parent.clone({ nodes: [] });
            oldRoot && restRoot.append(oldRoot);
            let nextSibs = [];
            let _child = arr[i - 1] || rule2;
            let next = _child.next();
            while (next) {
              nextSibs.push(next);
              next = next.next();
            }
            restRoot.append(nextSibs);
          });
          restRoot && (breakoutRoot || nodes[nodes.length - 1]).after(restRoot);
        }
      }
      rule2.remove();
    }
    var rootRuleMergeSel = Symbol("rootRuleMergeSel");
    var rootRuleEscapes = Symbol("rootRuleEscapes");
    function normalizeRootRule(rule2) {
      let { params } = rule2;
      let { type, selector, escapes } = parseRootRuleParams(params);
      if (type === "unknown") {
        throw rule2.error(
          `Unknown @${rule2.name} parameter ${JSON.stringify(params)}`
        );
      }
      if (type === "basic" && selector) {
        let selectorBlock = new Rule2({ selector, nodes: rule2.nodes });
        rule2.removeAll();
        rule2.append(selectorBlock);
      }
      rule2[rootRuleEscapes] = escapes;
      rule2[rootRuleMergeSel] = escapes ? !escapes("all") : type === "noop";
    }
    var hasRootRule = Symbol("hasRootRule");
    module2.exports = (opts = {}) => {
      let bubble = atruleNames(["media", "supports", "layer"], opts.bubble);
      let atruleChilds = createFnAtruleChilds(bubble);
      let unwrap = atruleNames(
        [
          "document",
          "font-face",
          "keyframes",
          "-webkit-keyframes",
          "-moz-keyframes"
        ],
        opts.unwrap
      );
      let rootRuleName = (opts.rootRuleName || "at-root").replace(/^@/, "");
      let preserveEmpty = opts.preserveEmpty;
      return {
        postcssPlugin: "postcss-nested",
        Once(root2) {
          root2.walkAtRules(rootRuleName, (node) => {
            normalizeRootRule(node);
            root2[hasRootRule] = true;
          });
        },
        Rule(rule2) {
          let unwrapped = false;
          let after = rule2;
          let copyDeclarations = false;
          let declarations = [];
          rule2.each((child) => {
            if (child.type === "rule") {
              if (declarations.length) {
                after = pickDeclarations(rule2.selector, declarations, after);
                declarations = [];
              }
              copyDeclarations = true;
              unwrapped = true;
              child.selectors = mergeSelectors(rule2, child);
              after = breakOut(child, after);
            } else if (child.type === "atrule") {
              if (declarations.length) {
                after = pickDeclarations(rule2.selector, declarations, after);
                declarations = [];
              }
              if (child.name === rootRuleName) {
                unwrapped = true;
                atruleChilds(rule2, child, true, child[rootRuleMergeSel]);
                after = breakOut(child, after);
              } else if (bubble[child.name]) {
                copyDeclarations = true;
                unwrapped = true;
                atruleChilds(rule2, child, true);
                after = breakOut(child, after);
              } else if (unwrap[child.name]) {
                copyDeclarations = true;
                unwrapped = true;
                atruleChilds(rule2, child, false);
                after = breakOut(child, after);
              } else if (copyDeclarations) {
                declarations.push(child);
              }
            } else if (child.type === "decl" && copyDeclarations) {
              declarations.push(child);
            }
          });
          if (declarations.length) {
            after = pickDeclarations(rule2.selector, declarations, after);
          }
          if (unwrapped && preserveEmpty !== true) {
            rule2.raws.semicolon = true;
            if (rule2.nodes.length === 0)
              rule2.remove();
          }
        },
        RootExit(root2) {
          if (root2[hasRootRule]) {
            root2.walkAtRules(rootRuleName, unwrapRootRule);
            root2[hasRootRule] = false;
          }
        }
      };
    };
    module2.exports.postcss = true;
  }
});

// node_modules/postcss-safe-parser/lib/safe-parser.js
var require_safe_parser = __commonJS({
  "node_modules/postcss-safe-parser/lib/safe-parser.js"(exports, module2) {
    var tokenizer = require_tokenize();
    var Comment2 = require_comment();
    var Parser = require_parser();
    var SafeParser = class extends Parser {
      createTokenizer() {
        this.tokenizer = tokenizer(this.input, { ignoreErrors: true });
      }
      comment(token) {
        let node = new Comment2();
        this.init(node, token[2]);
        let pos = this.input.fromOffset(token[3]) || this.input.fromOffset(this.input.css.length - 1);
        node.source.end = {
          offset: token[3],
          line: pos.line,
          column: pos.col
        };
        let text = token[1].slice(2);
        if (text.slice(-2) === "*/")
          text = text.slice(0, -2);
        if (/^\s*$/.test(text)) {
          node.text = "";
          node.raws.left = text;
          node.raws.right = "";
        } else {
          let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
          node.text = match[2];
          node.raws.left = match[1];
          node.raws.right = match[3];
        }
      }
      decl(tokens) {
        if (tokens.length > 1 && tokens.some((i) => i[0] === "word")) {
          super.decl(tokens);
        }
      }
      unclosedBracket() {
      }
      unknownWord(tokens) {
        this.spaces += tokens.map((i) => i[1]).join("");
      }
      unexpectedClose() {
        this.current.raws.after += "}";
      }
      doubleColon() {
      }
      unnamedAtrule(node) {
        node.name = "";
      }
      precheckMissedSemicolon(tokens) {
        let colon = this.colon(tokens);
        if (colon === false)
          return;
        let nextStart, prevEnd;
        for (nextStart = colon - 1; nextStart >= 0; nextStart--) {
          if (tokens[nextStart][0] === "word")
            break;
        }
        if (nextStart === 0)
          return;
        for (prevEnd = nextStart - 1; prevEnd >= 0; prevEnd--) {
          if (tokens[prevEnd][0] !== "space") {
            prevEnd += 1;
            break;
          }
        }
        let other = tokens.slice(nextStart);
        let spaces = tokens.slice(prevEnd, nextStart);
        tokens.splice(prevEnd, tokens.length - prevEnd);
        this.spaces = spaces.map((i) => i[1]).join("");
        this.decl(other);
      }
      checkMissedSemicolon() {
      }
      endFile() {
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        while (this.current.parent) {
          this.current = this.current.parent;
          this.current.raws.after = "";
        }
      }
    };
    module2.exports = SafeParser;
  }
});

// node_modules/postcss-safe-parser/lib/safe-parse.js
var require_safe_parse = __commonJS({
  "node_modules/postcss-safe-parser/lib/safe-parse.js"(exports, module2) {
    var { Input: Input2 } = require_postcss();
    var SafeParser = require_safe_parser();
    module2.exports = function safeParse(css, opts) {
      let input = new Input2(css, opts);
      let parser = new SafeParser(input);
      parser.parse();
      return parser.root;
    };
  }
});

// node_modules/postcss-simple-vars/index.js
var require_postcss_simple_vars = __commonJS({
  "node_modules/postcss-simple-vars/index.js"(exports, module2) {
    var IGNORE = Symbol("ignore");
    function definition(variables, node, opts) {
      let name = node.prop.slice(1);
      variables[name] = transformBackslashSequences(node.value);
      if (!opts.keep) {
        node.remove();
      }
    }
    function variable(variables, node, str, name, opts, result) {
      if (isIgnore(node, name))
        return str;
      if (opts.only) {
        if (typeof opts.only[name] !== "undefined") {
          return opts.only[name];
        }
        return str;
      }
      if (typeof variables[name] !== "undefined") {
        return variables[name];
      }
      if (opts.silent) {
        return str;
      }
      let fix = opts.unknown(node, name, result);
      if (fix) {
        return fix;
      }
      return str;
    }
    var UNICODE_8_CODE = /(?<=[^\\]|^)\\U([0-9abcdefABCDEF]{8})/g;
    var UNICODE_4_CODE = /(?<=[^\\]|^)\\u([0-9abcdefABCDEF]{4})/g;
    function transformBackslashSequences(value) {
      if (typeof value !== "string")
        return value;
      if (!value.includes("\\"))
        return value;
      return value.replace(UNICODE_8_CODE, (_, cp) => String.fromCodePoint(`0x${cp}`)).replace(UNICODE_4_CODE, (_, cp) => String.fromCodePoint(`0x${cp}`)).replace(/\\\\/g, "\\");
    }
    function simpleSyntax(variables, node, str, opts, result) {
      return str.replace(/(^|[^\w])\$([\w\d-_]+)/g, (_, bef, name) => {
        return bef + variable(variables, node, "$" + name, name, opts, result);
      });
    }
    function inStringSyntax(variables, node, str, opts, result) {
      return str.replace(/\$\(\s*([\w\d-_]+)\s*\)/g, (all, name) => {
        return variable(variables, node, all, name, opts, result);
      });
    }
    function bothSyntaxes(variables, node, str, opts, result) {
      str = simpleSyntax(variables, node, str, opts, result);
      str = inStringSyntax(variables, node, str, opts, result);
      return str;
    }
    function repeat(value, callback) {
      let oldValue;
      let newValue = value;
      do {
        oldValue = newValue;
        newValue = callback(oldValue);
      } while (newValue !== oldValue && newValue.includes("$"));
      return newValue;
    }
    function declValue(variables, node, opts, result) {
      node.value = repeat(node.value, (value) => {
        return bothSyntaxes(variables, node, value, opts, result);
      });
    }
    function declProp(variables, node, opts, result) {
      node.prop = repeat(node.prop, (value) => {
        return inStringSyntax(variables, node, value, opts, result);
      });
    }
    function ruleSelector(variables, node, opts, result) {
      node.selector = repeat(node.selector, (value) => {
        return bothSyntaxes(variables, node, value, opts, result);
      });
    }
    function atruleParams(variables, node, opts, result) {
      node.params = repeat(node.params, (value) => {
        return bothSyntaxes(variables, node, value, opts, result);
      });
    }
    function comment2(variables, node, opts, result) {
      node.text = node.text.replace(/<<\$\(\s*(\w+)\s*\)>>/g, (all, name) => {
        return variable(variables, node, all, name, opts, result);
      });
    }
    function mixin(helpers, node) {
      let name = node.params.split(/\s/, 1)[0];
      let vars = node.params.slice(name.length).trim();
      if (vars.length) {
        node[IGNORE] = helpers.list.comma(vars).map((str) => {
          let arg = str.split(":", 1)[0];
          return arg.slice(1).trim();
        });
      }
    }
    function isIgnore(node, value) {
      if (node[IGNORE] && node[IGNORE].includes(value)) {
        return true;
      } else if (node.parent) {
        return isIgnore(node.parent, value);
      } else {
        return false;
      }
    }
    module2.exports = (opts = {}) => {
      if (!opts.unknown) {
        opts.unknown = (node, name) => {
          throw node.error("Undefined variable $" + name);
        };
      }
      if (typeof opts.keep === "undefined") {
        opts.keep = false;
      }
      return {
        postcssPlugin: "postcss-simple-vars",
        prepare() {
          let variables = {};
          if (typeof opts.variables === "function") {
            variables = opts.variables();
          } else if (typeof opts.variables === "object") {
            variables = { ...opts.variables };
          }
          for (let name in variables) {
            if (name[0] === "$") {
              name = name.slice(1);
              variables[name] = variables[`$${name}`];
              delete variables[`$${name}`];
            }
            variables[name] = transformBackslashSequences(variables[name]);
          }
          return {
            OnceExit(_, { result }) {
              Object.keys(variables).forEach((key) => {
                result.messages.push({
                  plugin: "postcss-simple-vars",
                  type: "variable",
                  name: key,
                  value: variables[key]
                });
              });
              if (opts.onVariables) {
                opts.onVariables(variables);
              }
            },
            Declaration(node, { result }) {
              if (node.value.includes("$")) {
                declValue(variables, node, opts, result);
              }
              if (node.prop[0] === "$" && node.prop[1] !== "(") {
                if (!opts.only)
                  definition(variables, node, opts);
              } else if (node.prop.includes("$(")) {
                declProp(variables, node, opts, result);
              }
            },
            Comment(node, { result }) {
              if (node.text.includes("$")) {
                comment2(variables, node, opts, result);
              }
            },
            AtRule(node, helpers) {
              if (node.name === "define-mixin") {
                mixin(helpers, node);
              } else if (node.params && node.params.includes("$")) {
                atruleParams(variables, node, opts, helpers.result);
              }
            },
            Rule(node, { result }) {
              if (node.selector.includes("$")) {
                ruleSelector(variables, node, opts, result);
              }
            }
          };
        }
      };
    };
    module2.exports.postcss = true;
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(src_exports);
var import_coc2 = require("coc.nvim");

// src/completion.ts
var import_promises = __toESM(require("node:fs/promises"));
var import_node_path3 = __toESM(require("node:path"));
var import_node_process2 = require("node:process");
var import_coc = require("coc.nvim");

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
  const { root: root2 } = import_node_path2.default.parse(directory);
  const stopAt = import_node_path2.default.resolve(directory, options.stopAt || root2);
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

// node_modules/postcss/lib/postcss.mjs
var import_postcss = __toESM(require_postcss(), 1);
var postcss_default = import_postcss.default;
var stringify = import_postcss.default.stringify;
var fromJSON = import_postcss.default.fromJSON;
var plugin = import_postcss.default.plugin;
var parse = import_postcss.default.parse;
var list = import_postcss.default.list;
var document = import_postcss.default.document;
var comment = import_postcss.default.comment;
var atRule = import_postcss.default.atRule;
var rule = import_postcss.default.rule;
var decl = import_postcss.default.decl;
var root = import_postcss.default.root;
var CssSyntaxError = import_postcss.default.CssSyntaxError;
var Declaration = import_postcss.default.Declaration;
var Container = import_postcss.default.Container;
var Processor = import_postcss.default.Processor;
var Document = import_postcss.default.Document;
var Comment = import_postcss.default.Comment;
var Warning = import_postcss.default.Warning;
var AtRule = import_postcss.default.AtRule;
var Result = import_postcss.default.Result;
var Input = import_postcss.default.Input;
var Rule = import_postcss.default.Rule;
var Root = import_postcss.default.Root;
var Node2 = import_postcss.default.Node;

// src/completion.ts
var import_postcss_at_rules_variables = __toESM(require_lib());
var import_postcss_import = __toESM(require_postcss_import());
var import_data_url = __toESM(require_data_url());
var import_load_content = __toESM(require_load_content());
var import_postcss_nested = __toESM(require_postcss_nested());
var import_postcss_safe_parser = __toESM(require_safe_parse());
var import_postcss_simple_vars = __toESM(require_postcss_simple_vars());

// src/constants.ts
var ExtensionName = "coc-class-css";

// src/trie.ts
var TrieNode = class {
  constructor(data) {
    this.children = /* @__PURE__ */ new Map();
    this.data = data;
  }
  clear() {
    this.children.clear();
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

// src/completion.ts
var CSSClassCompletionProvider = class {
  constructor(context) {
    this.watched = /* @__PURE__ */ new Map();
    this.changed = /* @__PURE__ */ new Set();
    this.roots = /* @__PURE__ */ new Set();
    this.trie = new TrieNode();
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
  async jsonFileGet(path3) {
    try {
      const buf = await import_promises.default.readFile(path3);
      return JSON.parse(buf.toString("utf8")) || {};
    } catch (_) {
      return {};
    }
  }
  async configure(uri) {
    const cfg = {
      rootDir: import_coc.workspace.root,
      cssRoots: /* @__PURE__ */ new Set(),
      classAttributes: /* @__PURE__ */ new Set(),
      maxResults: 0
    };
    const cwd = (0, import_node_path3.dirname)(uri.path);
    let val = await findUp("package.json", { stopAt: import_coc.workspace.root, cwd });
    if (val) {
      val = import_node_path3.default.dirname(val);
    }
    cfg.rootDir = import_node_path3.default.resolve(val || import_coc.workspace.root);
    val = await findUp(`.${ExtensionName}.json`, { stopAt: import_coc.workspace.root, cwd });
    if (val) {
      const json = await this.jsonFileGet(val);
      (json[`${ExtensionName}.cssRoots`] || []).forEach((r) => cfg.cssRoots.add(import_node_path3.default.resolve(cfg.rootDir, r)));
      (json[`${ExtensionName}.classAttributes`] || []).forEach((r) => cfg.classAttributes.add(r));
      cfg.maxResults = parseInt(json[`${ExtensionName}.maxResults`]) || 0;
    }
    if (cfg.cssRoots.size == 0) {
      import_coc.workspace.getConfiguration(ExtensionName, uri.toString()).get("cssRoots", []).forEach((r) => cfg.cssRoots.add(import_node_path3.default.resolve(cfg.rootDir, r)));
    }
    if (cfg.maxResults < 1) {
      cfg.maxResults = import_coc.workspace.getConfiguration(ExtensionName, uri.toString()).get("maxResults", 20);
    }
    import_coc.workspace.getConfiguration(ExtensionName, uri.toString()).get("classAttributes", []).forEach((r) => cfg.classAttributes.add(r));
    import_coc.workspace.getConfiguration("tailwindCSS", uri.toString()).get("classAttributes", []).forEach((r) => cfg.classAttributes.add(r));
    if (cfg.classAttributes.size == 0) {
      cfg.classAttributes.add("class");
    }
    if (cfg.cssRoots.size == 0) {
      cfg.cssRoots.add(import_node_path3.default.resolve(cfg.rootDir, "index.css"));
    }
    return cfg;
  }
  async init(doc) {
    if (this.cfg) {
      return true;
    }
    const uri = import_coc.Uri.parse(doc.uri);
    if (!import_coc.workspace.root || uri.scheme !== "file") {
      return false;
    }
    this.cfg = await this.configure(uri);
    await this.rootsImport([...this.cfg.cssRoots]);
    return true;
  }
  pathResolve(p) {
    const { rootDir } = this.cfg;
    if (!import_node_path3.default.isAbsolute(p)) {
      p = import_node_path3.default.join(rootDir, p);
    }
    const result = import_node_path3.default.relative(rootDir, p);
    if (result != "") {
      p = result;
    }
    if (import_node_path3.default.isAbsolute(p)) {
      return void 0;
    }
    return p;
  }
  async rootsImport(paths) {
    return Promise.all(
      paths.map((v) => this.pathResolve(v)).filter((v) => v !== void 0).map((v) => {
        const path3 = import_node_path3.default.join(this.cfg.rootDir, v);
        this.roots.add(path3);
        return this.updateRoot(path3);
      })
    );
  }
  onFilesChanged() {
    const changed = [...this.changed];
    this.updateRoots().finally(() => {
      changed.forEach((c) => this.changed.delete(c));
      if (this.changed.size > 0) {
        (0, import_node_process2.nextTick)(this.onFilesChanged);
      }
    });
  }
  onFileChangedRaw(uri) {
    const path3 = uri.path;
    if (this.changed.has(path3)) {
      return;
    }
    if (this.changed.size == 0) {
      this.changed.add(path3);
      setTimeout(() => {
        this.onFilesChanged();
      }, 1e3);
    } else {
      this.changed.add(path3);
    }
  }
  async watchFile(path3, listener) {
    const relative = import_node_path3.default.relative(import_coc.workspace.root, path3);
    if (this.watched.has(path3)) {
      return;
    }
    const watcher = import_coc.workspace.createFileSystemWatcher(relative);
    watcher.onDidChange(listener);
    watcher.onDidCreate(listener);
    watcher.onDidDelete(listener);
    this.watched.set(path3, watcher);
  }
  fileLoad(path3) {
    if (import_data_url.default.isValid()) {
      return (0, import_load_content.default)(path3);
    } else {
      return (0, import_load_content.default)(path3).finally(() => {
        this.watchFile(path3, this.onFileChangedRaw.bind(this));
      });
    }
  }
  async updateRoots() {
    return Promise.all([...this.roots].map((p) => this.updateRoot(p)));
  }
  async processCSSResult(result, pathRelative, trie) {
    const selectors = /* @__PURE__ */ new Set();
    result.root.walk((n) => {
      if (n.type === "rule" && n.selector) {
        let file = n?.source?.input?.file;
        if (file) {
          pathRelative = import_node_path3.default.relative(this.cfg.rootDir, file);
          if (pathRelative.startsWith("node_modules/")) {
            pathRelative = pathRelative.substring("node_modules/".length);
          }
        }
        const lines = n.toString().trim().split("\n").filter((l) => !/^\s*$/.test(l));
        if (lines.length > 1) {
          lines[0] = lines[0].trim();
          lines[lines.length - 1] = lines[lines.length - 1].trim();
        }
        n.selectors.filter((s) => s[0] === ".").forEach((s) => {
          const idx = s.indexOf(" ");
          if (idx !== -1) {
            selectors.add({ token: s.substring(1, idx), pathRelative, source: lines.join("\n") });
          } else {
            selectors.add({ token: s.substring(1), pathRelative, source: lines.join("\n") });
          }
        });
      }
    });
    selectors.forEach((s) => {
      trie.wordAdd(s.token, s);
    });
  }
  async updateRoot(path3) {
    const { rootDir } = this.cfg;
    const trie = new TrieNode();
    const pathRelative = import_node_path3.default.relative(rootDir, path3);
    const css = await this.fileLoad(path3).catch((e) => {
      this.log.warn(`Failed to read: ${path3} `, e);
      return void 0;
    });
    if (css == void 0) {
      return;
    }
    return postcss_default([
      (0, import_postcss_simple_vars.default)(),
      (0, import_postcss_at_rules_variables.default)(),
      (0, import_postcss_nested.default)(),
      (0, import_postcss_import.default)({ root: rootDir, load: this.fileLoad.bind(this) })
    ]).process(css, { from: path3, parser: import_postcss_safe_parser.default }).then((res) => this.processCSSResult(res, pathRelative, trie)).then(() => this.trie = trie).catch((e) => {
      this.log.warn(`Failed to process: ${path3}`, e);
    });
  }
  provideCompletionItems(document2, position, _token, _context) {
    return new Promise(async (resolve) => {
      const results = [];
      if (!await this.init(document2)) {
        return resolve(results);
      }
      const line = document2.lineAt(position);
      if (line.isEmptyOrWhitespace) {
        return resolve(results);
      }
      const text = line.text;
      let sidx = position.character - 1;
      for (; sidx >= 0 && /[a-zA-Z0-9-_]/.test(text[sidx]); --sidx)
        ;
      ++sidx;
      const word = text.substring(sidx, position.character);
      if (word.length == 0) {
        return resolve(results);
      }
      const attr = function() {
        let arr = [];
        for (; sidx >= 0; --sidx) {
          if (text[sidx] === "'" || text[sidx] === '"') {
            --sidx;
            for (; sidx >= 0 && /\s/.test(text[sidx]); --sidx)
              ;
            if (sidx > 0 && text[sidx] === "=") {
              --sidx;
              for (; sidx >= 0 && /\s/.test(text[sidx]); --sidx)
                ;
              for (; sidx >= 0 && /[a-zA-Z0-9-_]/.test(text[sidx]); --sidx) {
                arr.unshift(text[sidx]);
              }
              break;
            }
          }
        }
        return arr.join("");
      }();
      if (attr === "" || !this.cfg.classAttributes.has(attr)) {
        return resolve(results);
      }
      for (const s of this.trie.prefixFind(word)) {
        results.push({
          label: s.token,
          kind: import_coc.CompletionItemKind.Variable,
          detail: s.pathRelative,
          documentation: {
            kind: "markdown",
            value: ["```css", s.source, "```"].join("\n")
          }
        });
        if (results.length >= this.cfg.maxResults) {
          break;
        }
      }
      return resolve(results);
    });
  }
};

// src/index.ts
async function activate(context) {
  const cfg = import_coc2.workspace.getConfiguration(ExtensionName);
  if (cfg.get("enabled", false) === false) {
    return;
  }
  const enabledLanguages = cfg.get("languages", ["html", "svelte", "vue"]);
  context.logger.info(`Activating ${ExtensionName} for ${enabledLanguages.join(",")}`);
  const provider = new CSSClassCompletionProvider(context);
  if (import_coc2.workspace.getWatchmanPath() == null) {
    import_coc2.window.showWarningMessage(
      `${ExtensionName} No watchman installed, workspaces files will not be watched for changes!`
    );
  }
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
