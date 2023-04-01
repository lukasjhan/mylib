import { AnyFunction } from "../common_types/function";

export function debounce<F extends AnyFunction>(
  func: F,
  waitFor: number = 100,
): F {
  let timeout: number | null = null;

  const debouncedFunc = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = window.setTimeout(() => func(...args), waitFor);
  };

  return debouncedFunc as F;
};
