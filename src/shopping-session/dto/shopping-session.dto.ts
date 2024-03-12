import { ApiProperty } from "@nestjs/swagger";
import { CartItemDTO } from "src/cart-items/dto/cart-items.dto";

export class ShoppingSessionDTO {

    @ApiProperty()
    cart_items: CartItemDTO[]
}