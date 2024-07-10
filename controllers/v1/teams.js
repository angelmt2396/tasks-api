import { teamsService } from '../../services/teams.js';
import { customResponse } from '../../utils/custom-response.js';
import { responses } from '../../utils/response-catalogs.js';
export class TeamsController {
  async findAllTeams(req, res, next) {
    try {
      const data = await teamsService.findAllTeams();
      const response = customResponse(responses.success.find, data);
      res.status(responses.success.create.code).json(response);
    } catch (error) {
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
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getEmailsByTeamName(req, res, next) {
    try {
      const data = await teamsService.getEmailsByTeamName(req.params.name);
      const response = customResponse(responses.success.find, data);
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      next(error);
    }
  }
}
