import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { tasksRouter } from '../../routes/v1/tasks.js';
import { ValidateRequest } from '../../middlewares/validate-request.js';
import { HandleException } from '../../middlewares/error-handler.js';
import { teamsRouter } from '../../routes/v1/teams.js';
import { usersRouter } from '../../routes/v1/users.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../../swagger.js';

export class ServerConfig {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes(tasksRouter);
    this.routes(teamsRouter);
    this.routes(usersRouter);
    this.handleException();
    this.setupSwagger();
  }

  setupSwagger() {
    if (process.env.NODE_ENV !== 'production') {
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
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
    this.app.use(v1, teamsRouter);
    this.app.use(v1, usersRouter);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`server ON in port: ${port}`);
    });
  }
}
