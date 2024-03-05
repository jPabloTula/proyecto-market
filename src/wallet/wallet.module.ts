import { Module } from '@nestjs/common';
import { WalletService } from './services/wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { UsersService } from 'src/users/services/users.service';
import { WalletController } from './controllers/wallet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity])],
  providers: [WalletService, UsersService],
  exports: [TypeOrmModule],
  controllers: [WalletController]
})
export class WalletModule {}
