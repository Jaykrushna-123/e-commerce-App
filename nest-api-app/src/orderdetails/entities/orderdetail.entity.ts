import { UserEntity } from "src/auth/entities/user.entity";
import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Orderdetail {
    @PrimaryGeneratedColumn() 
    orderDetailId: number;

    @Column({ default: 1, type: 'integer' })
    orderQty: number;

    @Column({ default: 0, type: 'decimal' })
    orderAmount: number;

    @Column({default: () => "CURRENT_TIMESTAMP", nullable: true})
    orderShippingDate: Date;

    @Column({default: () => "CURRENT_TIMESTAMP"})
    orderDate: Date;

    @ManyToOne(type=>Order,(order)=>order.orderId)
    @JoinColumn({name: 'orderId'})
    orderId:Order ;

    @ManyToOne(type=> Product ,(product)=>product.productId)
    @JoinColumn({name: 'productId'})
    productId:Product ;

    @ManyToOne(type=> UserEntity,(user)=>user.userId)
    @JoinColumn({name: 'userId'})
    userId:UserEntity ;
}
