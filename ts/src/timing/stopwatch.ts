import { sum } from "../data/stat";

export class StopWatch {
  public elapsed: number[];
  public elapsedLaps: number[];
  private last: {
    started: number;
    lap: number;
  } | undefined;

  constructor() {
    this.elapsed = [];
    this.elapsedLaps = [];
    this.last = {
      started: Date.now(),
      lap: Date.now(),
    }
  }

  public pause = () => {
    if (this.last === undefined) {
      return;
    }

    this.elapsed.push(Date.now() - this.last.started);
    this.last = undefined;
  };

  public resume = () => {
    if (this.last !== undefined) {
      return;
    }

    const resumedTime = Date.now();
    this.last = {
      started: resumedTime,
      lap: resumedTime,
    }
  };

  public reset = () => {
    this.elapsed = [];
    this.elapsedLaps = [];
    this.last = {
      started: Date.now(),
      lap: Date.now(),
    }
  };

  public getElapsedSec = (): number => {
    const prevElapsed = sum(this.elapsed);
    const currElapsed =
      this.last === undefined ? 0 : Date.now() - this.last.started;
    return (prevElapsed + currElapsed) / 1000;
  };

  public lap = (): void => {
    if (this.last === undefined) {
      return;
    }
    const now = Date.now();
    this.elapsedLaps.push(now - this.last.lap);
    this.last.lap = now;
  };
}
