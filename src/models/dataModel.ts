import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DataDocument = HydratedDocument<Data>;

@Schema()
export class Data {
  @Prop()
  temp: number;

  @Prop()
  hum: number;
}

export const DataSchema = SchemaFactory.createForClass(Data);
