import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../shared/error/ApiError';
import { UserRole } from '../shared/interfaces/user.interface';
import { TEXT } from '../shared/text/text';

/*
  проверяет, существует ли роль, которую передали в запросе
*/
export const roleValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.role in UserRole) {
    return next();
  }
  return next(ApiError.badFormData(TEXT.errors.incorrectRole));
};
