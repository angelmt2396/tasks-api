import { ServerConfig } from './config/server/server.js';
import { connectionDB } from './config/database/mongo.js';
import environments from './config/environments/index.js';
const Server = new ServerConfig();
connectionDB()
  .then(() => {
    Server.listen(environments.PORT);
  })
  .catch((error) => console.error(error));
