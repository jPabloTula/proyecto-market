import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {

    constructor(private readonly orderService: OrdersService) {

    }

    @Post()
    public async createOrder(@Body() body: { user_id: string }) {
        return await this.orderService.createOrder(body.user_id);
    }

}
