import { Range } from "./type/range.type";

export function getChunks(numbers: number[]): Range[] {
  const chunks = numbers
    .sort((a, b) => a - b)
    .reduce<Range[]>((acc, curr, idx, numbers) => {
      if (idx === 0 || curr !== numbers[idx - 1] + 1) {
        acc.push({ from: curr, to: curr + 1 });
      } else {
        acc[acc.length - 1].to++;
      }
      return acc;
    }, []);
  return chunks;
};
