import { Controller, Delete, Get, Param } from '@nestjs/common';
import { CartItemsService } from '../services/cart-items.service';

@Controller('cart-items')
export class CartItemsController {

    constructor(private readonly cartItemsService: CartItemsService) { }
    @Get()
    public async getCartItems() {
        return await this.cartItemsService.getAllCartItems();
    }
    
    @Delete('/:cart_item_id')
    public async deleteCartItem(@Param('cart_item_id') cart_item_id: string) {
        return await this.cartItemsService.deleteCartItem(cart_item_id);
    }
}
