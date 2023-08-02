import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

import appRoutes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(compression());
  }

  routes() {
    this.server.use(appRoutes);
  }
}

export default new App().server;
