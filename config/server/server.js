import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { tasksRouter } from '../../routes/v1/tasks.js';
import { ValidateRequest } from '../../middlewares/validate-request.js';
import { HandleException } from '../../middlewares/error-handler.js';
export class ServerConfig {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes(tasksRouter);
    this.handleException();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(ValidateRequest);
  }

  handleException() {
    this.app.use(HandleException);
  }

  routes() {
    const v1 = '/api/v1';
    this.app.use(v1, tasksRouter);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`server ON in port: ${port}`);
    });
  }
}
