export function filterUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function filterNull<T>(x: T | null): x is T {
  return x !== null;
}

export function filterUndefinedOrNull<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}