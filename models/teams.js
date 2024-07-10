import { Schema, model } from 'mongoose';

const Teamschema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
  },
  { timestamps: true },
);

const TeamsModel = model('teams', Teamschema);
export default TeamsModel;
