import { Schema, model } from 'mongoose';

const TasksSchema = new Schema(
  {
    uuid: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    assignedPersonEmail: {
      type: String,
      required: false,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    description: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const TasksModel = model('tasks', TasksSchema);
export default TasksModel;
