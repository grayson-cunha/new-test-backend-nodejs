import express from 'express';
import helmet from 'helmet';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
  }

  routes() {
    this.server.get('/', (req, res) => {
      res.send({ message: 'Hello World' });
    });
  }
}

export default new App().server;
