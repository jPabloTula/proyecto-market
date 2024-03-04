import { DataSourceConfig } from './config/data.source';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { ShoppingSessionModule } from './shopping-session/shopping-session.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UsersModule,
    OrdersModule,
    CartItemsModule,
    AuthModule,
    ProductsModule,
    OrderItemsModule,
    ShoppingSessionModule,
    WalletModule,
    TransactionsModule
  ]
})
export class AppModule {}
