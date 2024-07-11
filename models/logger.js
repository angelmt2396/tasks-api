import { Schema, model } from 'mongoose';

const LoggerSchema = new Schema(
  {
    uuid: {
      type: String,
      index: true,
    },
    path: {
      type: String,
      required: true,
      index: true,
    },
    DataRequest: {
      type: Object,
      required: false,
    },
    dataResponse: {
      type: Object,
      required: false,
    },
    dataAdditional: {
      type: Object,
      required: false,
    },
    isError: {
      type: Boolean,
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

const LoggerModel = model('logger', LoggerSchema);
export default LoggerModel;
