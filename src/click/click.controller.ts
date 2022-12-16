import { Get, Post, Body, Controller } from '@nestjs/common';
import { ClickService } from './click.service';
// import { Click } from '../models/clickModel';

@Controller('click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Post()
  async insert(@Body() clickRequest: { name: string; nrClicks: number }) {
    const click = await this.clickService.insertClick(clickRequest);
    console.log('Click Inserted' + click);
  }

  @Get()
  async showClicks() {
    const list = await this.clickService.getClicks();
    console.log(list);
    return list;
  }
}
