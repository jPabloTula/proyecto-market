import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OrdersEntity } from '../entities/orders.entity';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {

    constructor(private readonly orderService: OrdersService) {

    }

    @Post()
    public async createOrder(@Body() body: { user_id: string }) {
        return await this.orderService.createOrder(body.user_id);
    }

    @Get()
    @ApiHeader({
        name: 'access_token',
    })
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query() filters?: any,
    ): Promise<{ orders: OrdersEntity[]; total: number }> {
        return this.orderService.findOrders(page, limit, filters);
    }

    @ApiHeader({
        name: 'access_token',
    })
    @Get('/:order_id')
    @ApiParam({ name: 'order_id' })
    public async getUser(@Request() req, @Param('order_id') order_id: string) {
        const user_id = req.idUser;
        return await this.orderService.findOrderById(order_id, user_id);
    }

    @ApiHeader({
        name: 'access_token',
    })
    @Put('/:order_id/approve')
    @ApiParam({ name: 'order_id' })
    public async updateOrder(@Request() req, @Param('order_id') order_id: string) {
        const user_id = req.idUser;
        return await this.orderService.findAndAproveOrderById(order_id, user_id);
    }

    @ApiHeader({
        name: 'access_token',
    })
    @Put('/:order_id/cancel')
    @ApiParam({ name: 'order_id' })
    public async cancelOrder(@Request() req, @Param('order_id') order_id: string) {
        const user_id = req.idUser;
        return await this.orderService.cancelOrder(order_id, user_id);
    }


}
