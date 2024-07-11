import { usersService } from '../../services/users.js';
import { customResponse } from '../../utils/custom-response.js';
import { responses } from '../../utils/response-catalogs.js';
export class UserController {
  async registerUser(req, res, next) {
    try {
      const data = await usersService.registerUser(req.body);
      const response = customResponse(responses.success.create, data);
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      next(error);
    }
  }
}
