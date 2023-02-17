import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { config } from '../config';
import { Data, DataDocument } from 'src/models/dataModel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// console.log('config.AWS_REGION', config);
@Injectable()
export class MessageHandler {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}
  @SqsMessageHandler(config.TEST_QUEUE, false)
  async handleMessage(message: AWS.SQS.Message) {
    console.log(message.Body, '\nasdasdasdasd');
    const obj = JSON.parse(message.Body);
    // console.log(obj);
    try {
      const msg = JSON.parse(obj.Message);
      // console.log(msg);
      const newData = new this.dataModel({ temp: msg.temp, hum: msg.hum, time: obj.Timestamp });
      newData.save();
      console.log(obj);
    } catch (e) {
      console.log(e, 'Unreadable message!');
    }
  }
}
