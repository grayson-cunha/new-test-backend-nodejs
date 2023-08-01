import AWS from 'aws-sdk';
import { SQS } from '@aws-sdk/client-sqs';
import { AppError } from '../../utils/app-error';
import { HttpStatus } from '../constants/http-constants';

class SqsService {
  async sendMessage(message) {
    try {
      AWS.config.update({ region: process.env.AWS_REGION });

      const sqs = new SQS();

      await sqs.sendMessage({
        MessageBody: JSON.stringify(message),
        QueueUrl: `${process.env.AWS_QUEUE_URL_BASE}/${process.env.AWS_ACCOUNT_ID}/${process.env.AWS_QUEUE_NAME}`,
      });
    } catch (err) {
      throw new AppError(HttpStatus.BAD_REQUEST, err.message);
    }
  }
}

export default new SqsService();
