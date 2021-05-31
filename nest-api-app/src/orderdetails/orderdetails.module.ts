import { Module } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';
import { OrderdetailsController } from './orderdetails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderdetail } from './entities/orderdetail.entity';
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/auth/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/auth/entities/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Orderdetail,Order,Product,UserEntity])] ,

controllers: [OrderdetailsController],
  providers: [OrderdetailsService,ProductService,OrderService,UserService]
})
export class OrderdetailsModule {}
