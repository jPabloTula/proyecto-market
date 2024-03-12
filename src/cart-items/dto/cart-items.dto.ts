import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CartItemDTO {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    product_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    session_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    quantity: number;
}