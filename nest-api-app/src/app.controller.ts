import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // create an object of appservice class & inject in the appcontroller class
  constructor(private readonly appService: AppService) {}

  // GET : /?name=test&age=12
  @Get()
  getHello(@Query('name') name: string, @Query('age') age: number): string {
    console.log(name, age);
    return this.appService.getHello();
  }
  // POST : /
  @Post()
  postTest(@Body() data: any) {
    console.log(data);
    return 'post method function';
  }
  // PUT : /100
  @Put(':id')
  putTest(@Param('id') id: string, @Body() data: any) {
    console.log(id, data);
    return 'put method';
  }
  // DELETE : /100
  @Delete(':id')
  deleteTest(@Param('id') test: string) {
    console.log(test);
    return 'delete method';
  }
}
