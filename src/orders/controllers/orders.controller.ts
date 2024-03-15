import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OrdersEntity } from '../entities/orders.entity';
import { ApiHeader, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard, RolesGuard)
export class OrdersController {

    constructor(private readonly orderService: OrdersService) { }

    @Roles('CLIENT')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para crear una orden de compra',
        description: 'Crea una orden de compra y se obtiene el user_id desde el JWT',
    })
    @Post()
    public async createOrder(@Request() req) {
        const user_id = req.idUser;
        return await this.orderService.createOrder(user_id);
    }

    @Roles('CLIENT')
    @ApiOperation({ 
        summary: 'Método para lsitar las ordenes de compra'
    })
    @ApiHeader({
        name: 'access_token',
    })
    @Get()
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query() filters?: any,
    ): Promise<{ orders: OrdersEntity[]; total: number }> {
        return this.orderService.findOrders(page, limit, filters);
    }

    @Roles('CLIENT')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para listar una orden de compra',
        description: 'Se debe pasar por el body el order_id'
    })
    @ApiParam({ name: 'order_id' })
    @Get('/:order_id')
    public async getUser(@Request() req, @Param('order_id') order_id: string) {
        const user_id = req.idUser;
        return await this.orderService.findOrderById(order_id, user_id);
    }

    @Roles('CLIENT')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiParam({ name: 'order_id' })
    @ApiOperation({ 
        summary: 'Método para actualizar data de una orden de compra',
        description: 'Se debe pasar por el body la data'
    })
    @Put('/:order_id/approve')
    public async updateOrder(@Request() req, @Param('order_id') order_id: string) {
        const user_id = req.idUser;
        return await this.orderService.findAndAproveOrderById(order_id, user_id);
    }

    @Roles('CLIENT')
    @ApiHeader({
        name: 'access_token',
    })
    @ApiOperation({ 
        summary: 'Método para eleiminar una orden de compra',
        description: 'Se debe pasar por el body el order_id'
    })
    @ApiParam({ name: 'order_id' })
    @Put('/:order_id/cancel')
    public async cancelOrder(@Request() req, @Param('order_id') order_id: string) {
        const user_id = req.idUser;
        return await this.orderService.cancelOrder(order_id, user_id);
    }
}

