import { IsNotEmpty, IsString } from "class-validator";

export class CartItemDTO {
    @IsNotEmpty()
    @IsString()
    product_id: string;

    @IsNotEmpty()
    @IsString()
    session_id: string;

    @IsNotEmpty()
    @IsString()
    quantity: number;
}