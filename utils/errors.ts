import { NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {}

export class HttpError extends Error {
  code: number;

  constructor(message: string, errorCode: number) {
    super(message);
    this.code = errorCode;
  }
}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(
    '----------------------------------------------------------\n\n',
    err,
  );
  if (err instanceof HttpError) {
    res.status(err.code).json({
      message: err.code === 500 ? 'Sorry, please try again later' : err.message,
    });
  }
  res.status(err instanceof ValidationError ? 400 : 500).json({
    message:
      err instanceof ValidationError
        ? err.message
        : 'Sorry, please try again later',
  });
};
