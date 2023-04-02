import { Observer } from "../interface/observer";
import { LogLevel } from "./type/level";

export interface LogData {
  level: LogLevel;
  message: string;
}

export class Logger {
  private observers: Observer<string>[] = [];

  public addObserver(observer: Observer<string>) {
    this.observers.push(observer);
  }

  public removeObserver(observer: Observer<string>) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public log(data: LogData) {
    this.observers.forEach((observer) => observer.update(this.serialize(data)));
  }

  public serialize(data: LogData): string {
    const { level, message } = data;
    const now = new Date();
    const logString = `[${now.toISOString()}] [${level.toUpperCase()}] ${message}`;
    return logString;
  }
}
