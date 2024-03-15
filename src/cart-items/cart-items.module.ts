import { Module } from '@nestjs/common';
import { CartItemsEntity } from './entities/cart-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemsService } from './services/cart-items.service';
import { CartItemsController } from './controllers/cart-items.controller';
import { UsersService } from 'src/users/services/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([CartItemsEntity])],
    exports: [TypeOrmModule],
    providers: [CartItemsService, UsersService],
    controllers: [CartItemsController]
})
export class CartItemsModule {}
