/**
 * Simple prefix matcher.
 */
export class TrieNode<T> {
  readonly children: Map<string, TrieNode<T>> = new Map();
  data: T | undefined;

  constructor(data?: T) {
    this.data = data;
  }

  clear() {
    this.children.clear();
  }

  wordAdd(word: string, data: T) {
    let n = this as TrieNode<T>;
    for (let ch of word) {
      let nn = n.children.get(ch);
      if (nn === undefined) {
        nn = new TrieNode<T>();
        n.children.set(ch, nn);
      }
      n = nn;
    }
    n.data = data;
  }

  private wordRemoveImpl(n: TrieNode<T>, word: string): boolean {
    if (word.length === 0) {
      if (n.data !== undefined) {
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

  wordRemove(word: string): boolean {
    return this.wordRemoveImpl(this, word);
  }

  *dataTraverse(): Generator<T, void> {
    if (this.data !== undefined) {
      yield this.data;
    }
    for (const child of this.children.values()) {
      yield* child.dataTraverse();
    }
  }

  *prefixFind(prefix: string): Generator<T, void> {
    let n = this as TrieNode<T>;
    for (let ch of prefix) {
      const nn = n.children.get(ch);
      if (!nn) {
        return;
      }
      n = nn;
    }
    yield* n.dataTraverse();
  }
}
