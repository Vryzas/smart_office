import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClickDocument = HydratedDocument<Click>;

@Schema()
export class Click {
  @Prop()
  name: string;

  @Prop()
  nrClicks: number;
}

export const ClickSchema = SchemaFactory.createForClass(Click);
