import { CacheElement } from "./type/cache.type";

export class LRUCache<K, T> {
  private dataArray: Array<CacheElement<K, T>> = [];
  private maxSize: number;
  private eqFn: (k1: K, k2: K) => boolean;

  constructor(
    size: number,
    eqFn: (k1: K, k2: K) => boolean = (k1, k2) => k1 === k2,
  ) {
    this.maxSize = size;
    this.eqFn = eqFn;
  }

  public set(key: K, value: T) {
    const index = this.dataArray.findIndex(p => this.eqFn(p.key, key));
    const data =
      index > -1 ? this.dataArray.splice(index, 1)[0] : { key, value };
    if (this.dataArray.length === this.maxSize - 1) {
      this.dataArray.shift();
    }
    this.dataArray.push(data);
  }

  public get(key: K) {
    const index = this.dataArray.findIndex(p => this.eqFn(p.key, key));
    if (index > -1) {
      const pair = this.dataArray.splice(index, 1)[0];
      this.dataArray.push(pair);
      return pair.value;
    }
    return undefined;
  }
}