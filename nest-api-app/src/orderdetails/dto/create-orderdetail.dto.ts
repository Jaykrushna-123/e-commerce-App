import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrderdetailDto {
    @ApiProperty()
    @IsNotEmpty()
    Amount: number ;

    @ApiProperty()
    @IsNotEmpty()
    Qty: number ;

    @ApiProperty()
    @IsNotEmpty()
    orderId: number ;

    
    @ApiProperty()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    productId: number ;
}
