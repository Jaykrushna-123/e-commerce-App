import { UserEntity } from "src/auth/entities/user.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from './../../order/entities/order.entity';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    paymentId:number ;

    @Column({default: () => "CURRENT_TIMESTAMP" ,nullable:true})
    paymentDate: Date ;
  
    @Column({default:"completed"})
    paymentStatus:string ;

    @Column({default:0 ,type:"decimal"})
    payAmount:number ;

    @Column({default:0,type:"integer"})
    cardNo:number ;

    @Column({default:0,type:"integer"})
    cvvNo:number ;

    @Column()
    cardExpiration:string
    
    @Column({default:"debit card"})
    paymentType:string ;

    @ManyToOne((type)=> UserEntity,(user)=>user.userId)
    @JoinColumn({name:"userId"})
    userId:UserEntity ;

    @ManyToOne(type=> Order,(order)=>order.orderId)
    @JoinColumn({name:"orderId"})
    orderId:Order ;

    @ManyToOne(() => Product, (product) => product.productId)
    @JoinColumn({ name: 'productId' })
    productId: Product[];
}