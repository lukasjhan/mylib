import { Observer } from "../interface/observer";
import { LogLevel } from "./type/level";

export interface LogData {
  level: LogLevel;
  message: string;
};

export class Logger {
  private observers: Observer<LogData>[] = [];

  public addObserver(observer: Observer<LogData>) {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer<LogData>) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public log(data: LogData) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export class ConsoleLoggor implements Observer<LogData> {
  public update(data: LogData) {
    console.log(`[${data.level}] ${data.message}`);
  }
}

export class FileLogger implements Observer<LogData> {
  private fs: any;

  constructor(private filename: string) {
    this.fs = require('fs');
  }

  public update(data: LogData) {
    const logLine = `[${data.level}] ${data.message}\n`;
    this.fs.appendFileSync(this.filename, logLine);
  }
}