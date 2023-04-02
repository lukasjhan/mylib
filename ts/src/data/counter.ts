export function counter<T>(arr: T[]): Map<T, number> {
  const counts: Map<T, number> = new Map();

  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }

  return counts;
}