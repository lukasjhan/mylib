import { PromiseFuture } from "./type/promise.type";

export class Future<T> {
  private future: PromiseFuture<T> = { resolve: () => {}, reject: () => {} };
  private current: Promise<T>;

  constructor() {
    this.current = new Promise<T>((resolve, reject) => {
      this.future = {
        resolve,
        reject,
      };
    });
  }

  public promise() {
    return this.current;
  }

  public resolve(value: T) {
    this.future.resolve(value);
  }

  public reject(reason: any) {
    this.future.reject(reason);
  }
}
