import { tasksService } from '../../services/tasks.js';
import { customResponse } from '../../utils/custom-response.js';
import { responses } from '../../utils/response-catalogs.js';
import { logger } from '../../services/logger.js';
export class TasksController {
  async createTask(req, res, next) {
    try {
      console.log(req.body);
      const data = await tasksService.createTask(req.body);
      const response = customResponse(responses.success.create, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }

  async findTaskByUuid(req, res, next) {
    try {
      const data = await tasksService.findTaskByUuid(req.params.uuid);
      const response = customResponse(responses.success.find, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }

  async finAllTasks(req, res, next) {
    try {
      console.log(req.query);
      const { page, limit, order } = req.query;
      const data = await tasksService.finAllTasks(page, limit, order);
      const response = customResponse(responses.success.find, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const data = await tasksService.updateTask(req.body);
      const response = customResponse(responses.success.update, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const data = await tasksService.deleteTask(req.params.uuid);
      const response = customResponse(responses.success.delete, data);
      logger({ req: req, dataResponse: response, isError: false });
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      logger({ req: req, dataResponse: error, isError: true });
      next(error);
    }
  }
}
