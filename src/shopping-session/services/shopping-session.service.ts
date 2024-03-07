import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingSessionEntity } from '../entities/shopping-session.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ShoppingSessionDTO } from '../dto/shopping-session.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersService } from 'src/users/services/users.service';
import { CartItemsEntity } from 'src/cart-items/entities/cart-items.entity';
// import { ProductsEntity } from 'src/products/entities/products.entity';

@Injectable()
export class ShoppingSessionService {

    constructor(
        @InjectRepository(ShoppingSessionEntity)
        private readonly shoppingSessionRepository: Repository<ShoppingSessionEntity>,
        private readonly userService: UsersService,
        @InjectRepository(CartItemsEntity)
        private readonly cartItemsRepository: Repository<CartItemsEntity>
    ) { }

    public async createShoppingSession(body: ShoppingSessionDTO): Promise<void> {
        try {
            const user = await this.userService.findUserById(body.userId);
            if (!user) {
                throw ErrorManager.createSignatureError('El usuario no existe');
            }

            if (!user.shoppingSession) {
                let shoppingSessionEntity = { user: user, cartItems: [] };
                shoppingSessionEntity = await this.shoppingSessionRepository.save(shoppingSessionEntity);
                const cartItems = body.cartItems.map(cartItem => {
                    return { product: { id: cartItem.productId }, quantity: cartItem.quantity, session: shoppingSessionEntity };
                })
                await this.cartItemsRepository.save(cartItems);

                return Promise.resolve(null);
            } else {
                // TODO actualizar cuando ya existe el carrito de compras
            }
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async deleteProductsFromShoppingCart(shoppingSessionId: string, products: string[]): Promise<DeleteResult> {
        // return this.cartItemsRepository.delete({ session: { id: shoppingSessionId }, product: { id: In(products.map(product => product.id)) } })
        return this.cartItemsRepository.delete(products);

    }


}
