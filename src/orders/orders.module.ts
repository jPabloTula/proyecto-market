import { Module } from '@nestjs/common';
import { OrdersEntity } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { UsersService } from 'src/users/services/users.service';
import { ShoppingSessionService } from 'src/shopping-session/services/shopping-session.service';
import { CartItemsEntity } from 'src/cart-items/entities/cart-items.entity';
import { CartItemsService } from 'src/cart-items/services/cart-items.service';
import { OrderItemsEntity } from 'src/order-items/entities/order-items.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';
import { ProductsService } from 'src/products/services/products.service';
import { WalletService } from 'src/wallet/services/wallet.service';
import { WalletEntity } from 'src/wallet/entities/wallet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrdersEntity, CartItemsEntity, OrderItemsEntity, ProductsEntity, WalletEntity])],
    providers: [OrdersService, UsersService, ShoppingSessionService, CartItemsService, ProductsService, WalletService],
    controllers: [OrdersController],
    exports: [TypeOrmModule]
})
export class OrdersModule {}
