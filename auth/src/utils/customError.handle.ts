export class CustomError extends Error {
  public code: number;
  constructor(public message: string, code: number) {
    super(message);

    this.name = this.constructor.name;
    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }
}