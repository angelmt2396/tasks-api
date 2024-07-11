# tasks-api

## Introduction

Tasks API is a Node.js application that provides an API for managing tasks, teams, and users. It is built using Express.js and Mongoose, and it includes a comprehensive logging system.

## Environment Variables

To configure the application, you need to set up the following environment variables. Create a `.env` file in the root directory of your project and add the variables as shown below.

### .env File Example

```plaintext
MONGO_HOST=""
PORT=3000
NODE_ENV=development
```

```bash
- Node.js >= 20.x.x
# 
- npm >= 10.2.5
```

## Install dependencies

#### npm install

## Run local

#### npm run debug


## Project Structure
```plaintext
tasks-api
├── config/
├── controllers/
│   └── v1/
│       ├── tasks.js
│       ├── teams.js
│       └── users.js
├── middlewares/
│   ├── error-handler.js
│   └── validate-request.js
├── models/
│   ├── logger.js
│   ├── tasks.js
│   ├── teams.js
│   └── user.js
├── routes/
│   └── v1/
│       ├── tasks.js
│       ├── teams.js
│       └── users.js
├── services/
│   ├── logger.js
│   ├── tasks.js
│   ├── teams.js
│   └── users.js
├── utils/
│   ├── constants.js
│   ├── custom-exception.js
│   ├── custom-response.js
│   ├── response-catalogs.js
│   └── validations-request-params.js
├── .env
├── .gitignore
├── .prettierrc
├── app.js
├── Dockerfile
```


### Documentation

```bash
- [NodeJs](https://nodejs.org/docs/latest/api/)
- [GIT](https://git-scm.com/)
- [Mongoose](https://mongoosejs.com/docs/)
- [Express](https://expressjs.com/)
- [Eslint](https://eslint.org/docs/latest/)
```

# API Documentation

API documentation is provided using Swagger. You can view the documentation by navigating to `http://localhost:{PORT}/docs` once the server is running.

### API Endpoints

#### Tasks

- **GET /api/v1/tasks**: Get all tasks.
- **GET /api/v1/tasks/:uuid**: Get task by UUID.
- **POST /api/v1/tasks/create**: Create a new task.
- **POST /api/v1/tasks/update**: Update a task.
- **POST /api/v1/tasks/delete/:uuid**: Delete a task by UUID.

#### Teams

- **POST /api/v1/teams/add/email**: Add an email to a team.
- **GET /api/v1/teams/:name**: Get all emails of the team.
- **GET /api/v1/teams**: Get all teams.

#### Users

- **POST /api/v1/users/create**: Create a new user.
