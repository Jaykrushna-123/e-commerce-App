import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Orderdetail")
@Controller('orderdetails')
@UseGuards(JwtAuthGuard)
export class OrderdetailsController {
  constructor(private readonly orderdetailsService: OrderdetailsService) {}

  @Post()
  create(@Request() req:any , @Body() createOrderdetailDto: CreateOrderdetailDto) {
    return this.orderdetailsService.create(req.body.productId,req.body.orderId,req.user.userId,createOrderdetailDto);
  }

  @Get()
  findAll(@Request() req:any) {
    return this.orderdetailsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderdetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderdetailDto: UpdateOrderdetailDto) {
    return this.orderdetailsService.update(+id, updateOrderdetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderdetailsService.remove(+id);
  }
}
