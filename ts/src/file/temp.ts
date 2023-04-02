import { existsSync, unlinkSync } from "fs";

export class TempFileManager {
  private tempFiles: string[] = [];

  constructor(
    private prefix: string = "temp-",
    private location: string = "/tmp"
  ) {}

  public generateTempFile(): string {
    const fileName = this.generateFileName();
    this.tempFiles.push(fileName);
    return fileName;
  }

  private generateFileName(): string {
    const now = new Date();
    const timestamp = now.getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    const fileName = `${this.location}/${this.prefix}${timestamp}-${randomNum}`;
    return fileName;
  }

  public clear(): void {
    for (const fileName of this.tempFiles) {
      if (existsSync(fileName)) {
        unlinkSync(fileName);
      }
    }
    this.tempFiles = [];
  }
}
