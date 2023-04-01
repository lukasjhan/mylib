export class TimeoutException extends Error {
  constructor(mes: string = 'Timeout') {
    super(mes);
    this.name = "TimeoutException";
  }
}