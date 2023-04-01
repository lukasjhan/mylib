import { AnyFunction } from "../common_types/function";

export function throttle<F extends AnyFunction>(
  callback: F,
  limit: number = 100,
): F {
  let waiting = false;
  return function(...args: Parameters<F>) {
    if (!waiting) {
      //@ts-ignore
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  } as F;
}