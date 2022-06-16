import { NextFunction, Request, Response } from 'express';
import { TEXT } from '../shared/text/text';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUserAuthRequest } from '../shared/interfaces/req-extend-user.interface';
import { UserRole } from '../shared/interfaces/user.interface';
import { ApiError } from '../shared/error/ApiError';

export const authMiddleware =
  (role?: UserRole | undefined) => (req: IUserAuthRequest, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      return next();
    }
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Bearer {token}
      if (!token) {
        return res.status(401).json({ message: TEXT.errors.notAuthorized });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

      if (role) {
        if (decoded.role != role) {
          return next(ApiError.forbidden(TEXT.errors.notAllowedRole));
        }
      }

      req.user = decoded;
      return next();
    } catch (e) {
      //сюда мы попадаем, если есть проблемы с токеном
      //предполагаемая причина - истек срок дейсвтия | нет токена
      console.log(e);
      return res.status(401).json({ redirect: TEXT.errors.notAuthorized });
    }
  };
