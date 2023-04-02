import { Flushable } from "../interface/flush";
import { Observer } from "../interface/observer";
import * as fs from 'fs';

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
    const logData = this.buffer.join('\n');
    this.save(logData);
    this.buffer = [];
  }

  public end() {
    this.writeStream.end();
  }
}
