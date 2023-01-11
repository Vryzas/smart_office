import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from '../config';

console.log('config.AWS_REGION', config);
@Injectable()
export class MessageHandler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  @SqsMessageHandler(config.TEST_QUEUE, false)
  async handleMessage(message: AWS.SQS.Message) {
    console.log(message);
  }
}
