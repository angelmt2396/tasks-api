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

teamsRouter.post(
  `${ROUTE}/add/email`,
  checkSchema(checkName),
  checkSchema(checkEmail),
  [ValidateRequest],
  teamsController.addUserToTeamByEmail,
);

teamsRouter.get(
  `${ROUTE}/:name`,
  checkSchema(checkName),
  [ValidateRequest],
  teamsController.getEmailsByTeamName,
);

teamsRouter.get(`${ROUTE}/`, [ValidateRequest], teamsController.findAllTeams);
