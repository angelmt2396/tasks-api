import { Router } from 'express';
import { checkSchema } from 'express-validator';
import {
  checkEmail,
  checkNickName,
  checkPassword,
} from '../../utils/validations-request-params.js';
import { ValidateRequest } from '../../middlewares/validate-request.js';
import { UserController } from '../../controllers/v1/users.js';

export const usersRouter = Router();
const ROUTE = '/users';
const userController = new UserController();

usersRouter.post(
  `${ROUTE}/create`,
  checkSchema(checkNickName),
  checkSchema(checkEmail),
  checkSchema(checkPassword),
  [ValidateRequest],
  userController.registerUser,
);
