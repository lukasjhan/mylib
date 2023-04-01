export function getIntersection<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  const intersection = new Set<T>();

  for (const elem of set1) {
    if (set2.has(elem)) {
      intersection.add(elem);
    }
  }

  return intersection;
}

export function getUnion<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  const union = new Set(set1);
  for (const elem of set2) {
    union.add(elem);
  }
  return union;
}

export function getDifference<T>(set1: Set<T>, set2: Set<T>): Set<T> {
  const difference = new Set(set1);
  for (const elem of set2) {
    difference.delete(elem);
  }
  return difference;
}
