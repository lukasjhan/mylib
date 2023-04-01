export interface CacheElement<K, T> extends CacheData<T> {
  key: K;
}

export interface CacheData<T> {
  value: T;
}

export interface RecentCacheData<T> extends CacheData<T> {
  lastAccessTime: number;
}