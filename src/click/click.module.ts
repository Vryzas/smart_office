import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Click, ClickSchema } from 'src/models/clickModel';
import { ClickController } from './click.controller';
import { ClickService } from './click.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Click.name, schema: ClickSchema }])],
  providers: [ClickService],
  controllers: [ClickController],
})
export class ClickModule {}
