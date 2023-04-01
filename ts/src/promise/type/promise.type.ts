export type PromiseResolve<T> = (value: T | PromiseLike<T>) => void;
export type PromiseReject = (reason?: any) => void;
export type PromiseCallback<T> = (
  resolve: PromiseResolve<T>,
  reject: PromiseReject,
) => void;
export interface PromiseFuture<T> {
  resolve: PromiseResolve<T>;
  reject: PromiseReject;
}
