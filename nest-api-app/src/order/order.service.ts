import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
      private orderRepository: Repository<Order>,
    private userService: UserService,
    private productService: ProductService
  ){}

  async create(createOrderDto: CreateOrderDto, uid:string,pId:number) {
    let { amount } =createOrderDto;
    const product = await this.productService.findOne(pId);
    let user =await this.userService.findById(uid);
    return this.orderRepository.save({
      orderAmount:amount,  
      orderShippingDate:new Date().toISOString(),
      orderDate:new Date().toISOString(),
      userId:user,
      _productId:product
    });
  }

  findAll(uid:string) {
    return this.orderRepository.find({where: {user:uid}}).then((data)=> {
      if(data.length==0) throw new NotFoundException();
      return data;
    })
  }

  findOne(id: number) {
    return this.orderRepository.findOne(id).then((data)=>{
      if(!data) throw new NotFoundException() ;
      return data;
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(
      {orderId:id},
      {
        orderAmount:updateOrderDto.amount,
        orderShippingDate:new Date().toISOString(),
      }
      );
  }

  remove(id: number) {
    return this.orderRepository.delete({orderId:id});
  }
}
