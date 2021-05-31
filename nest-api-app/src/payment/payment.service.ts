import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/auth/user/user.service';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private userService: UserService,
    private orderService: OrderService ,
    private productService: ProductService
  ){}


  async create(uid:string,oid:number,pid:number,createPaymentDto: CreatePaymentDto) {
    let user=await this.userService.findById(uid);
    let order=await this.orderService.findOne(oid) ;
    let product =await this.productService.findOne(pid)
    let { amount,cardNo,cvv,expire,payType }=createPaymentDto ;

    return  this.paymentRepository.save({
      payAmount:amount,
      cardNo,
      cvvNo:cvv,
      cardExpiration:expire,
      paymentType:payType,
      paymentDate:new Date().toISOString(),
      userId:user,
      orderId:order,
      _productId:product
    });
  }


  findAll(uid:string) {
    return this.paymentRepository.find({where:{user:uid}}).then((data)=>{
      if(data.length==0) throw new NotFoundException();
      return data;
    });
  }

  findOne(id: number) {
    return this.paymentRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
      return data;
    })
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentRepository.update(id,
      {
        payAmount: updatePaymentDto.amount,
        cardNo: updatePaymentDto.cardNo,
        cvvNo: updatePaymentDto.cvv,
        cardExpiration:updatePaymentDto.expire,
        paymentType: updatePaymentDto.payType

      });
  }

  remove(id: number) {
    return this.paymentRepository.delete(id)
  }
}
