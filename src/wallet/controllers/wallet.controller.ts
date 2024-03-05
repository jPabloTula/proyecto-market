import { Body, Controller, Param, Post } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { WalletDTO } from '../dto/wallet.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('wallet')
export class WalletController {

    constructor(
        private readonly walletService: WalletService
    ) {}

    @Roles('ADMIN')
    @Post('create/:userId')
    public async createWallet(@Body() body: WalletDTO, @Param('userId') userId: string) {
        return await this.walletService.createWallet(body, userId);
    }

}
