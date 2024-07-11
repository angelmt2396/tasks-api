import TasksModel from '../models/tasks.js';
import { v4 as uuidv4 } from 'uuid';
import { responses } from '../utils/response-catalogs.js';
import {
  TASK_DOES_NOT_EXIST,
  TASKS_VALIDATION_MESSAGES,
  TEAM_DOES_NOT_EXIST,
} from '../utils/constants.js';
import { CustomException } from '../utils/custom-exception.js';
import TeamsModel from '../models/teams.js';

class TasksService {
  async createTask(taskData) {
    const {
      name,
      assignedPersonEmail,
      description,
      startDate,
      endDate,
      isCompleted,
      teamName,
    } = taskData;

    const team = await TeamsModel.findOne({ name: teamName });
    if (!team) {
      throw new CustomException(
        responses.error.doesNotExist(TEAM_DOES_NOT_EXIST),
      );
    }
    const task = new TasksModel({
      assignedPersonEmail,
      name,
      description,
      startDate,
      endDate,
      isCompleted,
      uuid: uuidv4(),
      team: team['_id'],
    });
    await task.save();
    return (({
      uuid,
      name,
      assignedPersonEmail,
      description,
      startDate,
      endDate,
      isCompleted,
      teamName,
    }) => ({
      uuid,
      name,
      assignedPersonEmail,
      description,
      startDate,
      endDate,
      isCompleted,
      teamName,
    }))(task);
  }

  async findTaskByUuid(uuid) {
    return TasksModel.findOne({ uuid, isDeleted: false })
      .populate({
        path: 'team',
        select: 'name -_id', // Selecciona solo el campo `name` del equipo y excluye el `_id`
      })
      .select(
        'uuid name assignedPersonEmail description startDate endDate isCompleted team -_id',
      )
      .lean();
  }

  async finAllTasks(page = 1, limit = 10, order = 'desc') {
    const sortBy = 'createdAt';
    const sortOrder = order === 'desc' ? -1 : 1;
    const offset = page ? (page - 1) * limit : 0;
    const tasks = await TasksModel.find({ isDeleted: false })
      .populate({
        path: 'team',
        select: 'name -_id',
      })
      .sort({ [sortBy]: sortOrder })
      .skip(offset)
      .limit(limit)
      .select(
        'uuid name assignedPersonEmail description startDate endDate isCompleted -_id',
      )
      .lean();
    const totalTasks = await TasksModel.countDocuments({ isDeleted: false });
    console.log(totalTasks);
    const totalPages = Math.ceil(totalTasks / limit);
    const currentPage = offset > tasks.length ? 0 : Math.ceil(offset / limit);
    return {
      pages: totalPages,
      currentPage: currentPage,
      data: tasks,
    };
  }

  async updateTask(taskData) {
    const { uuid, endDate, startDate, teamName } = taskData;

    const team = await TeamsModel.findOne({ name: teamName });
    if (!team) {
      throw new CustomException(
        responses.error.doesNotExist(TEAM_DOES_NOT_EXIST),
      );
    }

    const task = await this.findTaskByUuid(uuid);
    if (!task) {
      throw new CustomException(
        responses.error.doesNotExist(TASK_DOES_NOT_EXIST),
      );
    }

    const end = new Date(endDate);
    const start = new Date(task.startDate);
    if (endDate && !startDate && task.startDate && end <= start) {
      throw new CustomException(
        responses.error.validateEndDateGreater({
          msg: TASKS_VALIDATION_MESSAGES.DATE.VALIDATE_END_DATE_GREATER,
        }),
      );
    }
    delete taskData.teamName;
    taskData['team'] = team['_id'];
    console.log(taskData);
    const result = await this.updateRecords({ uuid }, taskData);
    if (!result) return null;
    return uuid;
  }

  async deleteTask(uuid) {
    const deleted = await this.updateRecords({ uuid }, { isDeleted: true });
    if (!deleted) {
      throw new CustomException(
        responses.error.doesNotExist(TASK_DOES_NOT_EXIST),
      );
    }
    return {};
  }

  async updateRecords(filter, update) {
    return TasksModel.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
}

export const tasksService = new TasksService();
