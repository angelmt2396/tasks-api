import { Schema, model } from 'mongoose';

const TasksSchema = new Schema(
  {
    uuid: {
      type: String,
      unique: true,
      index: true,
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
      index: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'teams',
    },
  },
  { timestamps: true },
);

const TasksModel = model('tasks', TasksSchema);
export default TasksModel;
