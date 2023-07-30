import AWS from 'aws-sdk';
import { SQS } from '@aws-sdk/client-sqs';

class SqsService {
  async sendMessage(message) {
    AWS.config.update({ region: process.env.AWS_REGION });

    const sqs = new SQS();

    await sqs.sendMessage({
      MessageBody: JSON.stringify(message),
      QueueUrl: `${process.env.AWS_QUEUE_URL_BASE}/${process.env.AWS_ACCOUNT_ID}/${process.env.AWS_QUEUE_NAME}`,
      MessageGroupId: process.env.AWS_MESSAGE_GROUP,
    });
  }
}

export default new SqsService();
