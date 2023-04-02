import { Flushable } from "../interface/flush";
import { Observer } from "../interface/observer";
import { LogLevel } from "./type/level";
import * as fs from 'fs';

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

export class ConsoleLoggor implements Observer<string> {
  public update(log: string) {
    console.log(log);
  }
}

export class FileLogger implements Observer<string>, Flushable {
  private writeStream: fs.WriteStream;
  private buffer: string[] = [];

  constructor(private filename: string, private limit: number = 20) {
    this.writeStream = fs.createWriteStream(this.filename, { flags: 'a' });
  }

  public update(log: string) {
    this.buffer.push(log);
    if (this.buffer.length >= this.limit) {
      this.flush();
    }
  }

  private async save(log: string) {
    this.writeStream.write(log);
  }

  public flush() {
    this.buffer.forEach((log) => this.save(log));
    this.buffer = [];
  }

  public end() {
    this.writeStream.end();
  }
}
