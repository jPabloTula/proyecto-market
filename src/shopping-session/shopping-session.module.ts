import { Module } from '@nestjs/common';
import { ShoppingSessionService } from './services/shopping-session.service';
import { ShoppingSessionController } from './controllers/shopping-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingSessionEntity } from './entities/shopping-session.entity';
import { UsersService } from 'src/users/services/users.service';
import { CartItemsEntity } from 'src/cart-items/entities/cart-items.entity';
import { ProductsEntity } from 'src/products/entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingSessionEntity, CartItemsEntity, ProductsEntity])],
  providers: [ShoppingSessionService, UsersService],
  controllers: [ShoppingSessionController],
  exports: [TypeOrmModule]
})
export class ShoppingSessionModule {}
