export class InvalidUrlException extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'InvalidUrlException';
  }
}