import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingSessionEntity } from '../entities/shopping-session.entity';
import { DeleteResult, In, Repository } from 'typeorm';
import { ShoppingSessionDTO } from '../dto/shopping-session.dto';
import { ErrorManager } from 'src/utils/error.manager';
import { UsersService } from 'src/users/services/users.service';
import { CartItemsEntity } from 'src/cart-items/entities/cart-items.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';
// import { ProductsEntity } from 'src/products/entities/products.entity';

@Injectable()
export class ShoppingSessionService {

    constructor(
        @InjectRepository(ShoppingSessionEntity)
        private readonly shoppingSessionRepository: Repository<ShoppingSessionEntity>,
        private readonly userService: UsersService,
        @InjectRepository(CartItemsEntity)
        private readonly cartItemsRepository: Repository<CartItemsEntity>,
        @InjectRepository(ProductsEntity)
        private readonly productsRepository: Repository<ProductsEntity>
    ) { }

    public async createShoppingSession(body: ShoppingSessionDTO, id: string): Promise<void> {
        try {
            const shoppingSession = await this.shoppingSessionRepository.findOneBy({ user: { id: id } });

            const user = await this.userService.findUserById(id);
            if (!user) {
                throw ErrorManager.createSignatureError('El usuario no existe');
            }

            if (!shoppingSession) {
                let shoppingSessionEntity = { user: user, cart_items: [] };
                shoppingSessionEntity = await this.shoppingSessionRepository.save(shoppingSessionEntity);
                const cart_items = body.cart_items.map(cartItem => {
                    return { product: { id: cartItem.product_id }, quantity: cartItem.quantity, session: shoppingSessionEntity };
                })

                // Verifica si el stock de productos es suficiente
                const products = await this.productsRepository.find();
                
                if (products.length !== 0) {
                    cart_items.forEach(cart_item => {
                        const item = products.find((product) => product.id === cart_item.product.id);        
                        if (item) {
                            if (item.stock < cart_item.quantity) {
                                throw ErrorManager.createSignatureError('No hay suficiente stock del producto ' + cart_item.product.id);
                            }
                        }
                    })
                }
                                               
                await this.cartItemsRepository.save(cart_items);

                return Promise.resolve(null);
            } else {
                const cartItems = body.cart_items.map(cartItem => {
                    return { product: { id: cartItem.product_id }, quantity: cartItem.quantity, session: shoppingSession };
                })
                await this.cartItemsRepository.save(cartItems);
            }
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async deleteProductsFromShoppingCart(shopping_session_id: string, products: string[]): Promise<DeleteResult> {
        return this.cartItemsRepository.delete({ product: { id: In(products.map(product => product)) }, session: { id: shopping_session_id } })
    }

    public async findShoppingSession(): Promise<ShoppingSessionEntity> {
        try {
            const shoppingSession: ShoppingSessionEntity[] = await this.shoppingSessionRepository.find()
                
            if (!shoppingSession) {
                throw new ErrorManager({
                    type: 'NOT_FOUND',
                    message: 'No se encontro carrito de compras',
                })
            }
            return shoppingSession[0];
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    public async deleteShoppingSession(shopping_session_id: string): Promise<DeleteResult> {
        return this.shoppingSessionRepository.delete(shopping_session_id)
    }


}
