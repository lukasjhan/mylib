export function arrayEquals<T>(
  lhs: T[],
  rhs: T[],
  eq: (a: T, b: T) => boolean = (a: T, b: T) => a === b
) {
  if (lhs === rhs) {
    return true;
  }
  if ((lhs && !rhs) || (!lhs && rhs)) {
    return false;
  }
  if (lhs.length !== rhs.length) {
    return false;
  }
  return lhs.every((a, index) => eq(a, rhs[index]));
}

export function generatorToArray<T>(gen: IterableIterator<T>): T[] {
  return Array.from(gen);
}

export function splitArray<T>(arr: T[], size: number): Array<T[]> {
  if (size <= 0 || arr.length === 0) {
    return [[]];
  }
  const copiedArray = Array.from(arr);
  const splitted: Array<Array<T>> = [];
  while (copiedArray.length !== 0) {
    splitted.push(copiedArray.splice(0, size));
  }
  return splitted;
}

export function removeDupInArr<T>(
  arr: T[],
  isInclude: (a: T[], b: T) => boolean = (a: T[], b: T) => a.includes(b)
): T[] {
  return arr.reduce((acc: T[], curr: T) => {
    if (isInclude(acc, curr)) return acc;
    return [...acc, curr];
  }, []);
}

export function isContinuous(arr: number[]): boolean {
  if (arr.length === 0) {
    return false;
  }

  arr.sort((a, b) => a - b);

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      return false;
    }
  }
  return true;
}
