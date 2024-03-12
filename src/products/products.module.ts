import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { UsersService } from 'src/users/services/users.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductsEntity])],
    exports: [TypeOrmModule],
    providers: [ProductsService, UsersService],
    controllers: [ProductsController]
})
export class ProductsModule {}
