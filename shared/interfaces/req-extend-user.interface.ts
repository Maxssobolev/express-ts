import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export interface IUserAuthRequest extends Request {
  user: string | JwtPayload;
}
