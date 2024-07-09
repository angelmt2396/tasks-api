import { tasksService } from '../../services/tasks.js';
import { customResponse } from '../../utils/custom-response.js';
import { responses } from '../../utils/response-catalogs.js';

export class TasksController {
  async createTask(req, res, next) {
    try {
      console.log(req.body);
      const data = await tasksService.createTask(req.body);
      const response = customResponse(responses.success.create, data);
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async findTaskByUuid(req, res, next) {
    try {
      const data = await tasksService.findTaskByUuid(req.params.uuid);
      const response = customResponse(responses.success.find, data);
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async finAllTasks(req, res, next) {
    try {
      console.log(req.query);
      const { page, limit, order } = req.query;
      const data = await tasksService.finAllTasks(page, limit, order);
      const response = customResponse(responses.success.find, data);
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const data = await tasksService.updateTask(req.body);
      const response = customResponse(responses.success.update, data);
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const data = await tasksService.deleteTask(req.params.uuid);
      const response = customResponse(responses.success.delete, data);
      res.status(responses.success.create.code).json(response);
    } catch (error) {
      next(error);
    }
  }
}
