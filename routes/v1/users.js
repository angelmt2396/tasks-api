import { Router } from 'express';
import { checkSchema } from 'express-validator';
import {
  checkEmail,
  checkPassword,
} from '../../utils/validations-request-params.js';
import { ValidateRequest } from '../../middlewares/validate-request.js';
import { UserController } from '../../controllers/v1/users.js';

export const usersRouter = Router();
const ROUTE = '/users';
const userController = new UserController();

/**
 * @swagger
 * /api/v1/users/create:
 *   post:
 *     summary: create user
 *     tags: [Tasks]
 *     security:
 *        - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: password
 *                 description: user password
 *                 example: "password"
 *               email:
 *                 type: string
 *                 description: user email
 *                 example: "email@example.com"
 *     responses:
 *       200:
 *         description: successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "successfully create."
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "email@example.com"
 *       400:
 *         description: Data validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Data validation error."
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "field"
 *                       msg:
 *                         type: string
 *                         example: "password must be a string"
 *                       path:
 *                         type: string
 *                         example: "password"
 *                       location:
 *                         type: string
 *                         example: "body"
 */
usersRouter.post(
  `${ROUTE}/create`,
  checkSchema(checkEmail),
  checkSchema(checkPassword),
  [ValidateRequest],
  userController.registerUser,
);
