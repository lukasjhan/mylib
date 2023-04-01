export class Chain {
  public promise: Promise<any>;

  constructor() {
    this.promise = Promise.resolve();
  }
  /**
   * @template T
   * @param {() => T} job
   * @return {Promise.<T>}
   */
  public next<T>(job: () => T | Promise<T>): Promise<T> {
    const wrap = {
      run: () => {},
    };
    const newPromise = new Promise<T>((resolve, reject) => {
      wrap.run = () => {
        try {
          const result = job();
          if (result && result instanceof Promise) {
            return result.then(resolve).catch(reject);
          }
          resolve(result);
          return result;
        } catch (error) {
          reject(error);
          return error;
        }
      };
    });
    this.promise = this.promise.then(wrap.run);
    return newPromise;
  }
}
