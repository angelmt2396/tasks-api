import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_HOST: process.env.MONGO_HOST,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
};
