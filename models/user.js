import { Schema, model } from 'mongoose';

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const UsersModel = model('users', UsersSchema);
export default UsersModel;
