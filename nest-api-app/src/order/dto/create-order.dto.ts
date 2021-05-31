import { ApiProperty } from "@nestjs/swagger";


export class CreateOrderDto {
@ApiProperty()
amount:number;

@ApiProperty()
productId: number;

@ApiProperty()
userId: string;

};
