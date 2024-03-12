import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ShoppingSessionService } from '../services/shopping-session.service';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ShoppingSessionDTO } from '../dto/shopping-session.dto';

@ApiTags('Shopping Session')
@Controller('shopping-session')
@UseGuards(AuthGuard)
export class ShoppingSessionController {

    constructor(private readonly shoppingSessionService: ShoppingSessionService) { }

    @ApiHeader({
        name: 'access_toekn',
    })
    @ApiOperation({ 
        summary: 'Método para dar de alta un carrito',
        description: 'Se debe enviar uno o varios productos en el body para dar de alta un carrito de compras'
    })
    @Post()
    public async create(@Body() body: ShoppingSessionDTO, @Request() req): Promise<void> {
        const user_id = req.idUser;
        return this.shoppingSessionService.createShoppingSession(body, user_id);
    }

    @ApiHeader({
        name: 'access_toekn',
    })
    @Delete()
    public async delete(@Body() body: { shopping_session_id: string, products: string[]}) {
        return this.shoppingSessionService.deleteProductsFromShoppingCart(body.shopping_session_id, body.products);
    }

    @ApiHeader({
        name: 'access_toekn',
    })
    @Get()
    public async findAllShoppingSessions() {
        return await this.shoppingSessionService.findShoppingSession();
    }

    @ApiHeader({
        name: 'access_toekn',
    })
    @Delete('/:shoppping_session_id')
    public async deleteShoppingSession(@Param('shoppping_session_id') id: string) {
        return await this.shoppingSessionService.deleteShoppingSession(id);    
    }

}
