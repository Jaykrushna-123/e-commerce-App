import { UserEntity } from "src/auth/entities/user.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orderdetail } from './../../orderdetails/entities/orderdetail.entity';

@Entity({name:"orders"})
export class Order {
@PrimaryGeneratedColumn()
orderId:number;

@Column({default:0 ,type:'decimal'})
orderAmount:number;


@Column({default: () => "CURRENT_TIMESTAMP", nullable:true})
orderShippingDate:Date ;

@Column({default:'pending'})
orderStatus:string;

@Column({default: () => "CURRENT_TIMESTAMP" , nullable:true})
orderDate: Date ;

@ManyToOne( type => UserEntity,(user)=>user.userId )
@JoinColumn({ name:"userId" })
 user: UserEntity;

 @OneToMany(type=> Orderdetail,(orderdetail)=>orderdetail.orderId)
 @JoinColumn({ name: 'orderDetailId' })
 orderdetail: Orderdetail[] ;

 @ManyToOne(() => Product, (product) => product.productId)
 @JoinColumn({ name: 'productId' })
 productId: Product[];

 @OneToMany(() => Payment, (payment) => payment.paymentId)
 @JoinColumn({ name: 'payment' })
 paymentId: Payment[];

};

