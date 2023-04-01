import { Range } from "./type/range.type";

export function range(stop: number): IterableIterator<number>;
export function range(
  start: number,
  stop: number,
  step?: number
): IterableIterator<number>;
export function range(
  start: number,
  stop?: number,
  step?: number
): IterableIterator<number> {
  if (stop === undefined) {
    return rangeImpl(0, start);
  }
  return rangeImpl(start, stop, step);
}

function* rangeImpl(
  start: number,
  stop: number,
  step?: number
): IterableIterator<number> {
  const delta = step || (start < stop ? 1 : -1);
  for (let i = start; i < stop; i += delta) {
    yield i;
  }
}

export function containsRange(outerRange: Range, innerRange: Range) {
  const { from: outBegin, to: outEnd } = outerRange;
  const { from: inBegin, to: inEnd } = innerRange;

  return outBegin <= inBegin && inEnd <= outEnd;
}

export function isRangeOverlap(range1: Range, range2: Range): boolean {
  const sortedRanges = [range1, range2].sort((r1, r2) => r1.from - r2.from);
  return sortedRanges[0].to >= sortedRanges[1].from;
}
