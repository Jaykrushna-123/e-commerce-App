import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';
import { ProductController } from 'src/product/product.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Order,Product])],
  controllers: [OrderController,ProductController],
  providers: [OrderService,ProductService]
})
export class OrderModule {}
