import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEnntity } from './entities/products.entity';
import { ProductsService } from './services/products.service';

@Module({
    imports: [TypeOrmModule.forFeature([ProductsEnntity])],
    exports: [TypeOrmModule],
    providers: [ProductsService]
})
export class ProductsModule {}
