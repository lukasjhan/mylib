export function* enumerate<T>(iterable: Iterable<T>): IterableIterator<[number, T]> {
  let i = 0;
  for (const item of iterable) {
    yield [i, item];
    i++;
  }
}
