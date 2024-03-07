import { Body, Controller, Delete, Post } from '@nestjs/common';
import { ShoppingSessionService } from '../services/shopping-session.service';
import { ShoppingSessionDTO } from '../dto/shopping-session.dto';
// import { ShoppingSessionEntity } from '../entities/shopping-session.entity';

@Controller('shopping-session')
export class ShoppingSessionController {

    constructor(private readonly shoppingSessionService: ShoppingSessionService) { }

    @Post('create')
    public async create(@Body() body: ShoppingSessionDTO): Promise<void> {
        return this.shoppingSessionService.createShoppingSession(body);
    }

    @Delete('delete')
    public async delete(@Body() body: { products: string[]}) {
        return this.shoppingSessionService.deleteProductsFromShoppingCart('',body.products);
    }
}
