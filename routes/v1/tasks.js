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
  validateOrder,
  validatePage,
  validateLimit,
  validateUuid,
} from '../../utils/validations-request-params.js';
import { TasksController } from '../../controllers/v1/tasks.js';
import { ValidateRequest } from '../../middlewares/validate-request.js';
import { HandleException } from '../../middlewares/error-handler.js';

export const tasksRouter = Router();
const ROUTE = '/tasks';
const taskController = new TasksController();

/**
 * @swagger
 * /api/v1/tasks/create:
 *   post:
 *     summary: create a new task
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
 *                 description: task name
 *                 example: "task name"
 *               assignedPersonEmail:
 *                 type: string
 *                 description: assigned person's email
 *                 example: "email@example.com"
 *               description:
 *                 type: string
 *                 description: task description
 *                 example: "task description"
 *               isCompleted:
 *                 type: boolean
 *                 description: the task is completed
 *                 example: false
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: start date
 *                 example: "2024-07-09T12:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: end date
 *                 example: "2024-07-10T12:00:00Z"
 *     responses:
 *       201:
 *         description: Task successfully created
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
 *                   example: "successfully created."
 *                 data:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                       example: "7870e3f5-3efd-463b-bb9a-5187cb3e848d"
 *                     name:
 *                       type: string
 *                       example: "task 1"
 *                     assignedPersonEmail:
 *                       type: string
 *                       example: "angel@gmial.com"
 *                     description:
 *                       type: string
 *                       example: "description"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-07T14:33:00.000Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-07T14:41:00.000Z"
 *                     isCompleted:
 *                       type: boolean
 *                       example: false
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

/**
 * @swagger
 * /api/v1/tasks/{uuid}:
 *   get:
 *     summary: find one by uuid
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the task
 *     responses:
 *       200:
 *         description: find one by uuid successfully
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
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                       example: "7870e3f5-3efd-463b-bb9a-5187cb3e848d"
 *                     name:
 *                       type: string
 *                       example: "task 1"
 *                     assignedPersonEmail:
 *                       type: string
 *                       example: "angel@gmial.com"
 *                     description:
 *                       type: string
 *                       example: "description"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-07T14:33:00.000Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-07T14:41:00.000Z"
 *                     isCompleted:
 *                       type: boolean
 *                       example: false
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
tasksRouter.get(
  `${ROUTE}/:uuid`,
  checkSchema(validateUuid),
  [ValidateRequest],
  taskController.findTaskByUuid,
);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *         example: 5
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The order of items
 *         example: desc
 *     responses:
 *       200:
 *         description: List of tasks successfully retrieved
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
 *                   type: object
 *                   properties:
 *                     pages:
 *                       type: integer
 *                       example: 23
 *                     currentPage:
 *                       type: integer
 *                       example: 0
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           uuid:
 *                             type: string
 *                             example: "f1a8bf14-5ee6-4771-a6fd-7936a02aa897"
 *                           name:
 *                             type: string
 *                             example: "task1"
 *                           assignedPersonEmail:
 *                             type: string
 *                             example: "angel@gmial.com"
 *                           description:
 *                             type: string
 *                             example: "description"
 *                           startDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-07-07T14:33:00.000Z"
 *                           endDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-07-07T14:41:00.000Z"
 *                           isCompleted:
 *                             type: boolean
 *                             example: false
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
 *                       value:
 *                         type: string
 *                         example: "descs"
 *                       msg:
 *                         type: string
 *                         example: "must be either asc or desc"
 *                       path:
 *                         type: string
 *                         example: "order"
 *                       location:
 *                         type: string
 *                         example: "query"
 */
tasksRouter.get(
  `${ROUTE}`,
  checkSchema(validateLimit),
  checkSchema(validateOrder),
  checkSchema(validatePage),
  [ValidateRequest],
  taskController.finAllTasks,
);

/**
 * @swagger
 * /api/v1/tasks/update:
 *   post:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: task name
 *                 example: "Task name"
 *               assignedPersonEmail:
 *                 type: string
 *                 description: assigned person's email
 *                 example: "email@example.com"
 *               description:
 *                 type: string
 *                 description: task description
 *                 example: "Task description"
 *               isCompleted:
 *                 type: boolean
 *                 description: the task is completed
 *                 example: false
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 description: Start date
 *                 example: "2024-07-09T12:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 description: End date
 *                 example: "2024-07-10T12:00:00Z"
 *     responses:
 *       200:
 *         description: Task successfully updated
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
 *                     uuid:
 *                       type: string
 *                       example: "7870e3f5-3efd-463b-bb9a-5187cb3e848d"
 *                     name:
 *                       type: string
 *                       example: "task 1"
 *                     assignedPersonEmail:
 *                       type: string
 *                       example: "angel@gmial.com"
 *                     description:
 *                       type: string
 *                       example: "description"
 *                     startDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-07T14:33:00.000Z"
 *                     endDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-07-07T14:41:00.000Z"
 *                     isCompleted:
 *                       type: boolean
 *                       example: false
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

/**
 * @swagger
 * /api/v1/tasks/delete/{uuid}:
 *   post:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uuid
 *         required: true
 *         schema:
 *           type: string
 *         description: UUID of the task
 *     responses:
 *       200:
 *         description: Task successfully deleted
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
 *                   example: "successfully deleted."
 *                 data:
 *                   type: object
 *                   properties:
 *                    null
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
 *                       value:
 *                         type: uuid
 *                         example: "0c143395-a499-4843-s"
 *                       msg:
 *                         type: string
 *                         example: "UUID must be a valid UUID"
 *                       path:
 *                         type: string
 *                         example: "uuid"
 *                       location:
 *                         type: string
 *                         example: "params"
 */
tasksRouter.post(
  `${ROUTE}/delete/:uuid`,
  checkSchema(validateUuid),
  [ValidateRequest],
  taskController.deleteTask,
);
