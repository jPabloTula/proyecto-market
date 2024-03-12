import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OrdersEntity } from '../entities/orders.entity';
import { ApiTags } from '@nestjs/swagger';

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
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query() filters?: any,
    ): Promise<{ orders: OrdersEntity[]; total: number }> {
        return this.orderService.findOrders(page, limit, filters);
    }

}
