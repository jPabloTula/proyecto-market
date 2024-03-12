import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersEntity } from '../entities/orders.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/services/users.service';
import { ErrorManager } from 'src/utils/error.manager';
import { ShoppingSessionService } from 'src/shopping-session/services/shopping-session.service';
import { CartItemsService } from 'src/cart-items/services/cart-items.service';
import { CartItemsEntity } from 'src/cart-items/entities/cart-items.entity';
import { OrderItemsEntity } from 'src/order-items/entities/order-items.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { WalletService } from 'src/wallet/services/wallet.service';
import { WalletEntity } from 'src/wallet/entities/wallet.entity';
import { TransactionsEntity } from 'src/transactions/entities/transactions.entity';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(OrdersEntity)
        private readonly orderRepository: Repository<OrdersEntity>,
        private readonly userService: UsersService,
        private readonly shoppingSessionService: ShoppingSessionService,
        private readonly cartItemsService: CartItemsService,
        @InjectRepository(CartItemsEntity)
        private readonly cartItemRepository: Repository<CartItemsEntity>,
        @InjectRepository(OrderItemsEntity)
        private readonly orderItemsRepository: Repository<OrderItemsEntity>,
        private readonly productService: ProductsService,
        private readonly walletService: WalletService,
        @InjectRepository(WalletEntity)
        private readonly walletRepository: Repository<WalletEntity>,
        @InjectRepository(TransactionsEntity)
        private readonly transactionRepository: Repository<TransactionsEntity>
    ) { }

    // Alta de pedido (order)
    public async createOrder(user_id: string): Promise<void> {

        try {
            const user = await this.userService.findUserById(user_id);
            if (!user) {
                throw ErrorManager.createSignatureError('El usuario no existe');
            }

            const shoppingSession = await this.shoppingSessionService.findShoppingSession();

            if (!shoppingSession) {
                throw ErrorManager.createSignatureError('El carrito de compras no existe');
            }

            const cartItems = await this.cartItemRepository.find({
                relations: ['product'],
            });

            // Crear order
            let orderEntity = { user: user, payment_type: 'credit_card', order_status: 'approved_payment', total_price: 0, order_items: [], transactions: [] };
            let sum = 0;
            cartItems.forEach(item => {
                sum += item.product.price * item.quantity;
            })
            orderEntity.total_price = sum;
            orderEntity = await this.orderRepository.save(orderEntity);

            // Actualizar wallet
            const wallet = await this.walletRepository.find({
                relations: ['user']
            })
            if (!wallet) {
                throw ErrorManager.createSignatureError('la billetera no existe');
            }

            wallet[0].balance = wallet[0].balance - sum;
            await this.walletService.updateWallet(wallet[0], wallet[0].id);

            // Crear order_items
            const order_items = cartItems.map(cartItem => {
                return {
                    product: {
                        id: cartItem.product.id
                    },
                    quantity: cartItem.quantity,
                    price: cartItem.product.price,
                    order: orderEntity
                };
            })
            await this.orderItemsRepository.save(order_items);

            // Actualizar stock en products
            const product = new ProductsEntity();
            cartItems.forEach(item => {
                product.stock = item.product.stock - item.quantity;
                return this.productService.updateProduct(product, item.product.id);
            })

            //Eliminar carrito de compras
            cartItems.forEach(item => {
                return this.cartItemsService.deleteCartItem(item.id);
            });

            await this.shoppingSessionService.deleteShoppingSession(shoppingSession.id);

            // Crear transaccion
            const transactionEntity = { user: user, order_status: 'confirmar orden', total_price: sum, order: orderEntity };
            await this.transactionRepository.save(transactionEntity);

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }
    }

    // filtar pedidos (order)
    public async findOrders(page: number = 1, limit: number = 10, filters?: any): Promise<{ orders: OrdersEntity[]; total: number }> {
        try {
            const skip = (page - 1) * limit;

            let query = this.orderRepository.createQueryBuilder('order');

            if (filters) {
                if (filters.createdAt) {
                    const dateString = filters.createdAt;
                    query = query.where("to_char(order.created_at, 'YYYY-MM-DD') = :dateString", { dateString: dateString });
                }

                if (filters.order_status) {
                    query = query.where('order.order_status LIKE :order_status', { order_status: `%${filters.order_status}%` });
                }
            }

            const total = await query.getCount();

            const orders = await query.skip(skip).take(limit).getMany();

            return { orders, total };
        } catch (error) {
            throw new ErrorManager.createSignatureError(error);
        }
    }
}
