export class StopWatch {
  private elapsed: number[];
  private elapsedLaps: number[];
  private lastStarted: number | undefined;
  private lastLap: number | undefined;

  constructor() {
    this.elapsed = [];
    this.elapsedLaps = [];
    this.lastStarted = Date.now();
    this.lastLap = Date.now();
  }

  public pause = () => {
    if (this.lastStarted === undefined || this.lastLap === undefined) {
      return;
    }

    this.elapsed.push(Date.now() - this.lastStarted);
    this.elapsedLaps.push(Date.now() - this.lastLap);
    this.lastStarted = undefined;
    this.lastLap = undefined;
  };

  public resume = () => {
    if (this.lastStarted !== undefined || this.lastLap !== undefined) {
      return;
    }

    const resumedTime = Date.now();
    this.lastStarted = resumedTime;
    this.lastLap = resumedTime;
  };

  public reset = () => {
    this.elapsed = [];
    this.elapsedLaps = [];
    this.lastStarted = Date.now();
    this.lastLap = Date.now();
  };

  public getElapsedSec = (): number => {
    const prevElapsed = this.elapsed.reduce((a, b) => a + b, 0);
    const currElapsed =
      this.lastStarted === undefined ? 0 : Date.now() - this.lastStarted;
    return (prevElapsed + currElapsed) / 1000;
  };

  public lap = (): number => {
    const prevElapsed = this.elapsedLaps.reduce((a, b) => a + b, 0);
    const currElapsed =
      this.lastLap === undefined ? 0 : Date.now() - this.lastLap;

    this.elapsedLaps = [];
    this.lastLap = Date.now();
    return (prevElapsed + currElapsed) / 1000;
  };
}
