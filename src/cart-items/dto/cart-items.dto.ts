import { IsNotEmpty, IsString } from "class-validator";

export class CartItemDTO {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    sessionId: string;

    @IsNotEmpty()
    @IsString()
    quantity: number;
}