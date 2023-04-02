export interface BoxplotStats {
  q1: number;
  median: number;
  q3: number;
  lower: number;
  upper: number;
  outliers: number[];
}

export function sum(numbers: number[]): number {
  let sum = 0;
  for (const number of numbers) {
    sum += number;
  }
  return sum;
}

export function mean(numbers: number[]): number {
  return sum(numbers) / numbers.length;
}

export function max(numbers: number[]): number {
  return Math.max(...numbers);
}

export function min(numbers: number[]): number {
  return Math.min(...numbers);
}

export function median(numbers: number[]): number {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

export function variance(numbers: number[]): number {
  const meanValue = mean(numbers);
  const squaredDiffs = numbers.map((n) => Math.pow(n - meanValue, 2));
  return mean(squaredDiffs);
}

export function standardDeviation(numbers: number[]): number {
  return Math.sqrt(variance(numbers));
}

export function percentile(numbers: number[], p: number): number {
  const sorted = numbers.slice().sort((a, b) => a - b);
  const index = (sorted.length - 1) * p;
  const lower = Math.floor(index);
  const upper = lower + 1;
  const weight = index % 1;
  if (upper >= sorted.length) {
    return sorted[lower];
  }

  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export function quartiles(numbers: number[]): [number, number, number] {
  return [
    percentile(numbers, 0.25),
    median(numbers),
    percentile(numbers, 0.75),
  ];
}

export function interquartileRange(numbers: number[]): number {
  const [q1, , q3] = quartiles(numbers);
  return q3 - q1;
}

export function mad(numbers: number[]): number {
  const medianValue = median(numbers);
  const absoluteDiffs = numbers.map((n) => Math.abs(n - medianValue));
  return median(absoluteDiffs);
}

export function zScore(numbers: number[]): number[] {
  const meanValue = mean(numbers);
  const standardDeviationValue = standardDeviation(numbers);
  return numbers.map((n) => (n - meanValue) / standardDeviationValue);
}

export function iqrOutliers(numbers: number[]): number[] {
  const [q1, , q3] = quartiles(numbers);
  const iqr = q3 - q1;
  const lower = q1 - 1.5 * iqr;
  const upper = q3 + 1.5 * iqr;
  return numbers.filter((n) => n < lower || n > upper);
}

export function madOutliers(numbers: number[]): number[] {
  const medianValue = median(numbers);
  const madValue = mad(numbers);
  const lower = medianValue - 3 * madValue;
  const upper = medianValue + 3 * madValue;
  return numbers.filter((n) => n < lower || n > upper);
}

export function zScoreOutliers(numbers: number[]): number[] {
  const zScores = zScore(numbers);
  return numbers.filter((_, i) => Math.abs(zScores[i]) > 3);
}

export function outliers(numbers: number[]): number[] {
  return iqrOutliers(numbers).concat(madOutliers(numbers));
}

export function boxplotStats(numbers: number[]): BoxplotStats {
  const [q1, medianValue, q3] = quartiles(numbers);
  const iqr = q3 - q1;
  const lower = q1 - 1.5 * iqr;
  const upper = q3 + 1.5 * iqr;
  return {
    q1,
    median: medianValue,
    q3,
    lower,
    upper,
    outliers: numbers.filter((n) => n < lower || n > upper),
  };
}
