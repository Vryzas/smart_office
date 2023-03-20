import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './consumer.service';
import * as AWS from 'aws-sdk';
import { config } from '../config';
import { MongooseModule } from '@nestjs/mongoose';
import { Data, DataSchema } from 'src/models/dataModel';

AWS.config.update({
  region: config.AWS_REGION,
  accessKeyId: config.ACCESS_KEY_ID,
  secretAccessKey: config.SECRET_ACCESS_KEY,
});
@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: config.TEST_QUEUE, // name of the queue
          queueUrl: config.TEST_QUEUE_URL, // the url of the queue
          region: config.AWS_REGION,
        },
      ],
      producers: [],
    }),
    MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }]),
  ],
  controllers: [],
  providers: [MessageHandler],
})
export class ConsumerModule {}
