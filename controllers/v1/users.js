import { usersService } from '../../services/users.js';
import { customResponse } from '../../utils/custom-response.js';
import { responses } from '../../utils/response-catalogs.js';
import { logger } from '../../services/logger.js';
export class UserController {
  async registerUser(req, res, next) {
    try {
      const data = await usersService.registerUser(req.body);
      const response = customResponse(responses.success.create, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }
}
