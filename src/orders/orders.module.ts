import { Module } from '@nestjs/common';
import { OrdersEntity } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OrdersEntity])],
    providers: [OrdersService],
    controllers: [OrdersController],
    exports: [TypeOrmModule]
})
export class OrdersModule {}
