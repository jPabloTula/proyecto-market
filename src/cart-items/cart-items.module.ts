import { Module } from '@nestjs/common';
import { CartItemsEntity } from './entities/cart-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([CartItemsEntity])],
    exports: [TypeOrmModule]
})
export class CartItemsModule {}
