import { teamsService } from '../../services/teams.js';
import { customResponse } from '../../utils/custom-response.js';
import { responses } from '../../utils/response-catalogs.js';
import { logger } from '../../services/logger.js';
export class TeamsController {
  async findAllTeams(req, res, next) {
    try {
      const data = await teamsService.findAllTeams();
      const response = customResponse(responses.success.find, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }

  async addUserToTeamByEmail(req, res, next) {
    try {
      const data = await teamsService.addUserToTeamByEmail(
        req.body.name,
        req.body.email,
      );
      const response = customResponse(responses.success.update, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }
  async getEmailsByTeamName(req, res, next) {
    try {
      const data = await teamsService.getEmailsByTeamName(req.params.name);
      const response = customResponse(responses.success.find, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }
}
