import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ApiError } from '../shared/error/ApiError';
import { TEXT } from '../shared/text/text';

export const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: TEXT.errors.unhandle });
};
