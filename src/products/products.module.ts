import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEnntity } from './entities/products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ProductsEnntity])],
    exports: [TypeOrmModule]
})
export class ProductsModule {}
