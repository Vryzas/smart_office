import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Click, ClickDocument } from 'src/models/clickModel';

@Injectable()
export class ClickService {
  constructor(@InjectModel(Click.name) private clickModel: Model<ClickDocument>) {}

  async insertClick(createClickDto: { name: string; nrClicks: number }): Promise<Click> {
    const createdClick = new this.clickModel(createClickDto);
    return createdClick.save();
  }

  async getClicks(): Promise<Click[]> {
    return this.clickModel.find().exec();
  }
}
