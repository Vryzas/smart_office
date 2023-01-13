import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from '../config';
import { Data, DataDocument } from 'src/models/dataModel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

console.log('config.AWS_REGION', config);
@Injectable()
export class MessageHandler {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}
  @SqsMessageHandler(config.TEST_QUEUE, false)
  async handleMessage(message: AWS.SQS.Message) {
    const obj = JSON.parse(message.Body);
    const newData = new this.dataModel({ temp: obj.temp, hum: obj.hum });
    newData.save();
    console.log(obj);
  }
}
