import dotenv from 'dotenv';
import app from './app/app';
import Database from './config/database/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  await Database.connect();
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
}

start();
