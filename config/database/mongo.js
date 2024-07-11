import mongoose from 'mongoose';
import environments from '../environments/index.js';
export const connectionDB = () => {
  return mongoose.connect(environments.MONGO_HOST, {});
};
