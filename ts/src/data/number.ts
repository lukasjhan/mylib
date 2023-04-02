export function round(x: number, n: number = 0) {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}

export function floor(x: number, n: number = 0) {
  return Math.floor(x * Math.pow(10, n)) / Math.pow(10, n);
}

export function ceil(x: number, n: number = 0) {
  return Math.ceil(x * Math.pow(10, n)) / Math.pow(10, n);
}

export function getEven(number: number) {
  return number + (number % 2 === 0 ? 0 : 1);
}

export function isFloatSame(a: number, b: number) {
  return Math.abs(a - b) < 0.000001;
}

export function isBetween(x: number, a: number, b: number): boolean {
  return x >= Math.min(a, b) && x <= Math.max(a, b);
}

export function clamp(number: number, min = 0, max = 1): number {
  return number > max ? max : number > min ? number : min;
}

export function positiveModulo(x: number, n: number) {
  return ((x % n) + n) % n;
}

export function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}

export function reduceFraction(
  numerator: number,
  denominator: number
): [number, number] {
  const divisor = gcd(numerator, denominator);
  return [numerator / divisor, denominator / divisor];
}

console.log(round(1.23456789, 3)); // 1.235
console.log(round(1.23456789, 0)); // 1.235