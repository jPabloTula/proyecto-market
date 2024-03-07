import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { CartItemDTO } from "src/cart-items/dto/cart-items.dto";

export class ShoppingSessionDTO {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    userId: string;

    cartItems: CartItemDTO[]
}