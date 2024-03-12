import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderItemsService } from '../services/order-items.service';

@ApiTags('Order-items')
@Controller('order-items')
export class OrderItemsController {

    constructor(private readonly orderItemsService: OrderItemsService) { }

    @Get()
    public async findAllOrderItems() {
        return await this.orderItemsService.findOrderItems();
    }
}
