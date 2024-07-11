import { Router } from 'express';
import { TeamsController } from '../../controllers/v1/teams.js';
import { checkSchema } from 'express-validator';
import {
  checkEmail,
  checkName,
} from '../../utils/validations-request-params.js';
import { ValidateRequest } from '../../middlewares/validate-request.js';

export const teamsRouter = Router();
const ROUTE = '/teams';
const teamsController = new TeamsController();

/**
 * @swagger
 * /api/v1/teams/add/email:
 *   post:
 *     summary: add an email to a team
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
 *               name:
 *                 type: string
 *                 description: team name
 *                 example: "team name"
 *               email:
 *                 type: string
 *                 description: user email
 *                 example: "email@example.com"
 *     responses:
 *       200:
 *         description: successfully updated.
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "successfully update."
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "BACKEND"
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
 *                         example: "Name must be a string"
 *                       path:
 *                         type: string
 *                         example: "name"
 *                       location:
 *                         type: string
 *                         example: "body"
 */
teamsRouter.post(
  `${ROUTE}/add/email`,
  checkSchema(checkName),
  checkSchema(checkEmail),
  [ValidateRequest],
  teamsController.addUserToTeamByEmail,
);

/**
 * @swagger
 * /api/v1/teams/{name}:
 *   get:
 *     summary: search all emails of the team
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: team name
 *     responses:
 *       200:
 *         description: successfully search results.
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
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "successfully search results."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "ange.moran@gmail.com"
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
 *                         example: "Name must be a string"
 *                       path:
 *                         type: string
 *                         example: "name"
 *                       location:
 *                         type: string
 *                         example: "params"
 */
teamsRouter.get(
  `${ROUTE}/:name`,
  checkSchema(checkName),
  [ValidateRequest],
  teamsController.getEmailsByTeamName,
);

teamsRouter.get(`${ROUTE}/`, [ValidateRequest], teamsController.findAllTeams);
