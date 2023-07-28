import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  //start mongo

  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
}

start();
