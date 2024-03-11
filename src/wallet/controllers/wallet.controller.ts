import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { WalletDTO, WalletUpdateDTO } from '../dto/wallet.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('wallet')
export class WalletController {

    constructor(
        private readonly walletService: WalletService
    ) {}

    @Roles('ADMIN')
    @Post('/:user_id')
    public async createWallet(@Body() body: WalletDTO, @Param('user_id') user_id: string) {
        return await this.walletService.createWallet(body, user_id);
    }

    @Put('/:wallet_id')
    public async updateWallet(@Param('wallet_id') id: string, @Body() body: WalletUpdateDTO) {
        return await this.walletService.updateWallet(body, id);
    }

}
