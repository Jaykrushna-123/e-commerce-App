import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto';
import { Orderdetail } from './entities/orderdetail.entity';

@Injectable()
export class OrderdetailsService {
  constructor(
    @InjectRepository(Orderdetail)
    private orderDetailsRepository: Repository<Orderdetail>,
    private productService: ProductService ,
    private userService: UserService,
    private orderService:OrderService,
  ) {}


  async create(oid:number, pid:number, uid:string, createOrderdetailDto: CreateOrderdetailDto) {
  const order=await this.orderService.findOne(oid);
  let product= await this.productService.findOne(pid);
  let user= await this.userService.findById(uid)
  let { Amount,Qty }= createOrderdetailDto ;

  return this.orderDetailsRepository.save({
    orderAmount:Amount,
    orderQty:Qty,
    orderShippingDate:new Date().toISOString(),
    orderDate:new Date().toISOString(),
    orderId:order,
    productId:product,
    userId:user
  });
  }

  findAll(uid:string) {
    const user =  this.userService.findById(uid);
    return this.orderDetailsRepository.find({ where: { userId: user } });
  }
  

  findOne(id: number) {
    return  this.orderDetailsRepository.findOne(id).then((data)=>{
      if(!data) throw new NotFoundException();
      return data ;
    })
  }

  update(id: number, updateOrderdetailDto: UpdateOrderdetailDto) {
    return this.orderDetailsRepository.update(
    id,
      {
        orderAmount:updateOrderdetailDto.Amount,
        orderQty:updateOrderdetailDto.Qty 
      }
    )
  };

  remove(id: number) {
    return this.orderDetailsRepository.delete(id)
  };
};
