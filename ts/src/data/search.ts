export function binarySearch<T, E>(
  arr: T[],
  value: E,
  compare: (arrValue: T, compElement: E) => number,
  fallbackLowerBoundIndex: boolean = false,
): number | undefined {
  let left = 0,
    right = arr.length - 1,
    pivot = 0;

  if (arr.length === 0) return undefined;

  while (left <= right) {
    pivot = Math.floor((left + right) / 2);
    const ret = compare(arr[pivot], value);
    if (ret <= 0) {
      right = pivot - 1;
    } else if (ret > 0) {
      left = pivot + 1;
    }
  }
  if (left < arr.length && compare(arr[left], value) === 0) {
    return left;
  }

  return fallbackLowerBoundIndex ? left : undefined;
};