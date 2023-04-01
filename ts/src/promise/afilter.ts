import { filterNull } from "../data/nullable";
import { asyncMap } from "./amap";

export async function asyncFilter<T>(
  arr: T[],
  predicate: (item: T) => Promise<boolean>
): Promise<T[]> {
  const filtered = await asyncMap(arr, async item => {
    const includeItem = await predicate(item);
    return includeItem ? item : null;
  });
  return filtered.filter(filterNull);
}