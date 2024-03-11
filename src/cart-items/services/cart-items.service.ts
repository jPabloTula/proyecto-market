import { Injectable } from '@nestjs/common';
import { CartItemsEntity } from '../entities/cart-items.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CartItemsService {

    constructor(
        @InjectRepository(CartItemsEntity) private readonly cartItemsRepository: Repository<CartItemsEntity>
    ) { }

    public async getAllCartItems() {
        return await this.cartItemsRepository.find();
    }

    public async deleteCartItem(cart_item_id: string): Promise<DeleteResult> {
        return this.cartItemsRepository.delete(cart_item_id)
    }

}
