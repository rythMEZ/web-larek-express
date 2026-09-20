import { NextFunction, Request, Response } from 'express';

interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: ErrorWithStatusCode,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : err.message,
  });
};

export default errorHandler;
