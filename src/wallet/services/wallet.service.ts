import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WalletEntity } from '../entities/wallet.entity';
import { Repository, UpdateResult } from 'typeorm';
import { WalletDTO, WalletUpdateDTO } from '../dto/wallet.dto';
import { UsersService } from 'src/users/services/users.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class WalletService {

    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletRepository: Repository<WalletEntity>,
        private readonly usersService: UsersService
    ) { }

    public async createWallet(body: WalletDTO, user_id: string): Promise<WalletEntity> {
        try {
            const user = await this.usersService.findUserById(user_id);
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

    public async updateWallet(body: WalletUpdateDTO, id: string): Promise<UpdateResult | undefined> {
        try {
            const wallet: UpdateResult = await this.walletRepository.update(id, body);
            if (wallet.affected === 0) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo actualizar'
                })
            }
            return wallet;
        } catch (error) {
            throw new ErrorManager.createSignatureError(error.message);
        }
    }

    public async getWalletByUserId(user_id: string): Promise<WalletEntity> {
        try {

            const product = await this.walletRepository
                .createQueryBuilder('wallet')
                .where({ user_id })
                .getOne();
            if (!product) {
                throw new NotFoundException(`Product with ID ${user_id} not found`);
            }
            return product;
        } catch (error) {
            throw ErrorManager.createSignatureError(error.message);
        }

    }
}
