import { Body, Controller, Post } from '@nestjs/common';
import { MessageProducer } from './producer.service';

@Controller('sqs')
export class ProducerController {
  constructor(private readonly messageService: MessageProducer) {}

  @Post()
  sendMessage(@Body() body: { body: string }) {
    return this.messageService.sendMessage(body);
  }
}
