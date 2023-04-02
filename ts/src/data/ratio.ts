import { reduceFraction } from "./number";

export class Ratio {
  private numerator: number;
  private denominator: number;

  constructor(numerator: number, denominator: number) {
    const [reducedNumerator, reducedDenominator] = reduceFraction(
      numerator,
      denominator
    );
    this.numerator = reducedNumerator;
    this.denominator = reducedDenominator;
  }

  public getData = (): [number, number] => {
    return [this.numerator, this.denominator];
  };

  public getRatio = (): number => {
    return this.numerator / this.denominator;
  };

  public toString = (delimiter: string = "/"): string => {
    return `${this.numerator}${delimiter}${this.denominator}`;
  };
}
