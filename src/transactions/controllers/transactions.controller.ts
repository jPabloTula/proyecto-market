import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TransactionsService } from '../services/transactions.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { TransactionsEntity } from '../entities/transactions.entity';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(AuthGuard)
export class TransactionsController {

    constructor(
        private readonly transactionService: TransactionsService
    ) { }

    @Roles('CLIENT')
    @ApiOperation({ 
        summary: 'Método para listar data de las transacciones'
    })
    @ApiHeader({ name: 'Access Token' })
    @Get()
    public async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
        @Query() filters?: any,
    ): Promise<{ transactions: TransactionsEntity[]; total: number }> {
        return this.transactionService.findTransactions(page, limit, filters);
    }
    
}
