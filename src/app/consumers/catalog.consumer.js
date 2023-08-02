import AWS from 'aws-sdk';
import { SQS } from '@aws-sdk/client-sqs';
import { Consumer } from 'sqs-consumer';
import { AppError } from '../../utils/app-error';
import { HttpStatus } from '../constants/http-constants';

AWS.config.update({ region: process.env.AWS_REGION });

export function createConsumer({ queueUrl, batchSize, handler }) {
  try {
    return Consumer.create({
      queueUrl,
      batchSize,
      handleMessageBatch: handler,
      sqs: new SQS(),
    });
  } catch (err) {
    throw new AppError(HttpStatus.BAD_REQUEST, err.message);
  }
}
