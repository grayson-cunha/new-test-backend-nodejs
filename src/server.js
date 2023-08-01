import dotenv from 'dotenv';
import app from './app/app';
import Database from './config/database/database';
import { createConsumer } from './app/consumers/catalog.consumer';
import generateCatalogJsonHandler from './app/consumers/handlers/generate-catalog-json-handler';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  await Database.connect();
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));

  const consumer = createConsumer({
    queueUrl: `${process.env.AWS_QUEUE_URL_BASE}/${process.env.AWS_ACCOUNT_ID}/${process.env.AWS_QUEUE_NAME}`,
    batchSize: 10,
    handler: generateCatalogJsonHandler,
  });

  consumer.start();
}

start();
