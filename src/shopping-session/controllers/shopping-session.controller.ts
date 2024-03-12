import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ShoppingSessionService } from '../services/shopping-session.service';
import { ShoppingSessionDTO } from '../dto/shopping-session.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Shopping Session')
@Controller('shopping-session')
export class ShoppingSessionController {

    constructor(private readonly shoppingSessionService: ShoppingSessionService) { }

    @Post()
    public async create(@Body() body: ShoppingSessionDTO): Promise<void> {
        return this.shoppingSessionService.createShoppingSession(body);
    }

    @Delete()
    public async delete(@Body() body: { shopping_session_id: string, products: string[]}) {
        return this.shoppingSessionService.deleteProductsFromShoppingCart(body.shopping_session_id, body.products);
    }

    @Get()
    public async findAllShoppingSessions() {
        return await this.shoppingSessionService.findShoppingSession();
    }

    @Delete('/:shoppping_session_id')
    public async deleteShoppingSession(@Param('shoppping_session_id') id: string) {
        return await this.shoppingSessionService.deleteShoppingSession(id);    
    }

}
