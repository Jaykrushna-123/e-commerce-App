import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class CreatePaymentDto {
    @ApiProperty()
    @IsNotEmpty()
    amount: number ;

    @ApiProperty()
     cardNo:number ;

     @ApiProperty()
     cvv:number ;

     @ApiProperty()
     expire:string ;
     
     @ApiProperty()
     payType:string ;
     
     @ApiProperty()
    userId: string;

    @ApiProperty()
    product: number;

    @ApiProperty()
    order: number;
}
