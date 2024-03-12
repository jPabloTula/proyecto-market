import { Module } from '@nestjs/common';
import { OrderItemsController } from './controllers/order-items.controller';
import { OrderItemsService } from './services/order-items.service';
import { OrderItemsEntity } from './entities/order-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemsEntity])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService]
})
export class OrderItemsModule {}
