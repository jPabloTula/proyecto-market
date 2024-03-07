import { Module } from '@nestjs/common';
import { CartItemsEntity } from './entities/cart-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsService } from './services/cart-items.service';

@Module({
    imports: [TypeOrmModule.forFeature([CartItemsEntity])],
    exports: [TypeOrmModule],
    providers: [CartItemsService]
})
export class CartItemsModule {}
