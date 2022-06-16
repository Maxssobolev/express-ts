import { Router } from 'express';
import { body } from 'express-validator';
import UserController from '../controllers/user.controller';
import { roleValidatorMiddleware } from '../middleware/role-validation.middleware';
import { validateRequestMiddleware } from '../middleware/validate-request.middleware';

const userRouter = Router();

userRouter.post(
  '/login',
  body('login').exists({ checkFalsy: true }),
  body('password').exists({ checkFalsy: true }),
  validateRequestMiddleware,
  UserController.login,
);

userRouter.post(
  '/register',
  body('login').exists({ checkFalsy: true }),
  body('password').exists({ checkFalsy: true }),
  body('role').exists({ checkFalsy: true }),
  validateRequestMiddleware,
  roleValidatorMiddleware,
  UserController.registration,
);

export { userRouter };
