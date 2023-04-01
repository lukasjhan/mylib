export function round(x: number, n: number) {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}

export function floor(x: number, n: number) {
  return Math.floor(x * Math.pow(10, n)) / Math.pow(10, n);
}

export function ceil(x: number, n: number) {
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
