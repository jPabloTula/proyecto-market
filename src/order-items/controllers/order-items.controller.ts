import { AuthGuard } from './../../auth/guards/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderItemsService } from '../services/order-items.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Order-items')
@Controller('order-items')
@UseGuards(AuthGuard, RolesGuard)
export class OrderItemsController {

    constructor(private readonly orderItemsService: OrderItemsService) { }

    @Roles('CLIENT')
    @ApiOperation({ 
        summary: 'Método para listar los order items'
    })
    @ApiHeader({
        name: 'access_token',
    })
    @Get()
    public async findAllOrderItems() {
        return await this.orderItemsService.findOrderItems();
    }
}
