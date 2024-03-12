import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionsEntity } from '../entities/transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class TransactionsService {

    constructor(
        @InjectRepository(TransactionsEntity)
        private readonly transactionRepository: Repository<TransactionsEntity>,
    ) { }

    public async findTransactions(page: number = 1, limit: number = 10, filters?: any): Promise<{transactions: TransactionsEntity[], total: number }> {
        try {
            const skip = (page - 1) * limit;
            let query = this.transactionRepository.createQueryBuilder('transaction');

            if (filters) {
                if (filters.user_id) {
                    query = query.where('transaction.user_id = :user_id', { user_id: filters.user_id });
                }

                if (filters.order_id) {
                    query = query.where('transaction.order_id = :order_id', { order_id: filters.order_id });
                }

                if (filters.createdAt) {
                    const dateString = filters.createdAt;
                    query = query.where("to_char(transaction.created_at, 'YYYY-MM-DD') = :dateString", { dateString: dateString });
                }

                if (filters.order_status) {
                    query = query.where('transaction.order_status LIKE :order_status', { order_status: `%${filters.order_status}%` });
                }
            }

            const total = await query.getCount();

            const transactions = await query.skip(skip).take(limit).getMany();

            return { transactions, total };
        } catch (error) {
            throw new ErrorManager.createSignatureError(error);        
        }
    }
}
