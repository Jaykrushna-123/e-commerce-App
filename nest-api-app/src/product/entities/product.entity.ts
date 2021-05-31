import { Order } from 'src/order/entities/order.entity';
import { Orderdetail } from 'src/orderdetails/entities/orderdetail.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column({ nullable: false })
  productName: string;

  @Column({ default: 0, type: 'decimal' })
  productPrice: number;

  @Column({ nullable: false })
  productImage: string;

  @Column({ default: 0, type: 'decimal' })
  productSalePrice: number;

  @Column({ default: 10 })
  productStock: number;

  @OneToMany(() => Order, (order) => order.orderId)
  orderId: Order[];

  
  @OneToMany(() => Payment, (payment) => payment.paymentId)
  paymentId: Order[];
}
