import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { TransactionsService } from './services/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsEntity } from './entities/transactions.entity';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionsEntity])],
  controllers: [TransactionsController],
  providers: [TransactionsService, UsersService]
})
export class TransactionsModule {}
