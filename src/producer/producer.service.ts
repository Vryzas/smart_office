import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';
import { config } from '../config';

@Injectable()
export class MessageProducer {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage(body: any) {
    // const message: any = JSON.stringify(body);
    const message = {
      id: 'generated',
      body: JSON.stringify(body.body),
      groupId: 'mqtt',
      deduplicationId: JSON.stringify(body.deduplicationId),
      messageAttributes: {},
      delaySeconds: 0,
    };

    // return message;

    try {
      await this.sqsService.send(config.TEST_QUEUE, message);
      return 'message sent: ' + message.body;
    } catch (error) {
      console.log('error in producing image!', error);
    }
  }
}
