export function numberCompare(a: number, b: number): number {
  return a - b;
}

export function sortStringNumbers(strNums: string[]): string[] {
  const nums: number[] = strNums.map((str) => parseInt(str));
  nums.sort(numberCompare);
  return nums.map((num) => num.toString());
}
