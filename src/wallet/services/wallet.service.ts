import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from '../entities/wallet.entity';
import { Repository } from 'typeorm';
import { WalletDTO } from '../dto/wallet.dto';
import { UsersService } from 'src/users/services/users.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class WalletService {

    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletRepository: Repository<WalletEntity>,
        private readonly usersService: UsersService
    ) {}

    public async createWallet(body: WalletDTO, userId: string): Promise<WalletEntity> {
        try {
            const user = await this.usersService.findUserById(userId);
            return await this.walletRepository.save({
                user: user,
                wallet: body
            });
        } catch (error) {
            throw new ErrorManager({
                type: 'CONFLICT',
                message: 'error al crear la billetera'
            });
        }
    }
}
