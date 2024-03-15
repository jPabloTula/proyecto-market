import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { WalletDTO, WalletUpdateDTO } from '../dto/wallet.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Wallets')
@Controller('wallet')
export class WalletController {

    constructor(
        private readonly walletService: WalletService
    ) {}

    @Roles('ADMIN')
    @ApiOperation({ 
        summary: 'Método para creat billetera',
        description: 'Los valores de balance y money_type se cargan por default'
    })
    @Post('/:user_id')
    public async createWallet(@Body() body: WalletDTO, @Param('user_id') user_id: string) {
        return await this.walletService.createWallet(body, user_id);
    }

    @ApiOperation({ 
        summary: 'Método para actualizar data de billetera',
        description: 'Los valores de balance y money_type se cargan en el body'
    })
    @Roles('ADMIN')
    @Put('/:wallet_id')
    public async updateWallet(@Param('wallet_id') id: string, @Body() body: WalletUpdateDTO) {
        return await this.walletService.updateWallet(body, id);
    }

}
