import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CartItemsService } from '../services/cart-items.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Cart Items')
@Controller('cart-items')
@UseGuards(AuthGuard, RolesGuard)
export class CartItemsController {

    constructor(private readonly cartItemsService: CartItemsService) { }
    
    @Roles('CLIENT')
    @ApiOperation({ 
        summary: 'Método para listar los carritos de compra existentes'
    })
    @Get()
    @ApiHeader({
        name: 'access_token',
    })
    public async getCartItems() {
        return await this.cartItemsService.getAllCartItems();
    }
    
    @Roles('CLIENT')
    @ApiOperation({ 
        summary: 'Método para eliminar carrito de compras',
        description: 'Se debe enviar cart_item_id en el body'
    })
    @ApiHeader({
        name: 'access_token',
    })
    @Delete('/:cart_item_id')
    public async deleteCartItem(@Param('cart_item_id') cart_item_id: string) {
        return await this.cartItemsService.deleteCartItem(cart_item_id);
    }
}
