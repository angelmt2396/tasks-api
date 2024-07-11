import { Router } from 'express';
import { checkSchema } from 'express-validator';
import {
  checkName,
  checkEmail,
  checkDescription,
  optionalCheckName,
  optionalCheckDescription,
  checkStartDate,
  checkEndDateToCreate,
  checkEndDateToUpdate,
  checkIsCompleted,
} from '../../utils/validations-request-params.js';
import { TasksController } from '../../controllers/v1/tasks.js';
import { ValidateRequest } from '../../middlewares/validate-request.js';
import { HandleException } from '../../middlewares/error-handler.js';

export const tasksRouter = Router();
const ROUTE = '/tasks';
const taskController = new TasksController();

tasksRouter.post(
  `${ROUTE}/create`,
  checkSchema(checkName),
  checkSchema(checkEmail),
  checkSchema(checkDescription),
  checkSchema(checkStartDate),
  checkSchema(checkEndDateToCreate),
  checkSchema(checkIsCompleted),
  [ValidateRequest],
  [HandleException],
  taskController.createTask,
);

tasksRouter.get(
  `${ROUTE}/:uuid`,
  [ValidateRequest],
  taskController.findTaskByUuid,
);

tasksRouter.get(`${ROUTE}`, [ValidateRequest], taskController.finAllTasks);

tasksRouter.post(
  `${ROUTE}/update`,
  checkSchema(optionalCheckName),
  checkSchema(checkEmail),
  checkSchema(optionalCheckDescription),
  checkSchema(checkStartDate),
  checkSchema(checkEndDateToUpdate),
  checkSchema(checkIsCompleted),
  [ValidateRequest],
  taskController.updateTask,
);

tasksRouter.post(
  `${ROUTE}/delete/:uuid`,
  [ValidateRequest],
  taskController.deleteTask,
);
