export async function asyncMap<T, U>(
  arr: T[],
  asyncFn: (item: T) => Promise<U>
): Promise<U[]> {
  const promises = arr.map(async (item) => await asyncFn(item));
  return Promise.all(promises);
}