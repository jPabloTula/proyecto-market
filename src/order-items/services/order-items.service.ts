import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemsEntity } from '../entities/order-items.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class OrderItemsService {
    constructor(
        @InjectRepository(OrderItemsEntity)
        private readonly orderItemsRepository: Repository<OrderItemsEntity>,
    ) { }

    public async findOrderItems(): Promise<OrderItemsEntity[]> {
        try {
            const orderItems: OrderItemsEntity[] = await this.orderItemsRepository.find();
            if (orderItems.length === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se han encontrado resultados',
                });
            }
            return orderItems;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }
}
