import { RecentCacheData } from "./type/cache.type";

export class RecentCache<T> {
  private cache: Map<string, RecentCacheData<T>> = new Map();
  private cacheSize: number;

  constructor(cacheSize: number) {
    this.cacheSize = cacheSize;
  }

  public get(key: string): T | undefined {
    const cacheData = this.cache.get(key);
    if (cacheData) {
      cacheData.lastAccessTime = Date.now();
      return cacheData.value;
    } 
    return undefined;
  }

  public set(key: string, value: T): void {
    if (this.cache.size >= this.cacheSize) {
      const leastRecent = this.getLeastRecent();
      if (leastRecent) {
        this.cache.delete(leastRecent);
      }
    }

    this.cache.set(key, {
      value: value,
      lastAccessTime: Date.now(),
    });
  }

  private getLeastRecent(): string | undefined {
    let leastRecentKey: string | undefined;
    let leastRecentTime: number | undefined;

    for (const [key, value] of this.cache.entries()) {
      if (!leastRecentTime || value.lastAccessTime < leastRecentTime) {
        leastRecentKey = key;
        leastRecentTime = value.lastAccessTime;
      }
    }

    return leastRecentKey;
  }
}