import { Controller, Get } from '@nestjs/common';

@Controller()
export class TaskController {

  @Get('/task')
  task(): string {
    // return task word
    return 'asf';
  }
}
