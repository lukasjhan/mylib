import { TimeoutException } from "../exception/timeoutException";

export async function sleep(interval: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export function runWithTimeout<T>(
  fn: () => Promise<T>,
  timeoutMS: number
): Promise<T> {
  return new Promise((resolve, reject) => {
    const fnPromise = fn();
    const timeout = setTimeout(() => {
      reject(new TimeoutException());
    }, timeoutMS);

    fnPromise
      .then((result) => {
        clearTimeout(timeout);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeout);
        reject(error);
      });
  });
}
