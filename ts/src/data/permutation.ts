export function permutations<T>(arr: T[], length: number): Array<T[]> {
  const result: Array<T[]> = [];

  function generate(current: T[], available: T[]) {
    if (current.length === length) {
      result.push(current.slice());
      return;
    }

    for (let i = 0; i < available.length; i++) {
      current.push(available[i]);
      generate(current, available.slice(0, i).concat(available.slice(i + 1)));
      current.pop();
    }
  }

  generate([], arr);
  return result;
}

export function combinations<T>(arr: T[], len: number): Array<T[]> {
  const combinations: Array<T[]> = [];

  function generate(startIndex: number, combination: T[]) {
    if (combination.length === len) {
      combinations.push(combination);
      return;
    }

    for (let i = startIndex; i < arr.length; i++) {
      generate(i + 1, [...combination, arr[i]]);
    }
  }

  generate(0, []);
  return combinations;
}
