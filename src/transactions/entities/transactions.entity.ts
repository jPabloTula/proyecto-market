import { BaseEntity } from "../../config/base.entity";
import { ITransaction } from "src/interfaces/transactions.interface";
import { OrdersEntity } from "../../orders/entities/orders.entity";
import { UsersEntity } from "../../users/entities/users.entity";

import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'transactions' })
export class TransactionsEntity extends BaseEntity implements ITransaction {
    
    @Column()
    orderStatus: string;

    @Column()
    totalPrice: number;

    @ManyToOne(() => UsersEntity, (user) => user.transactions)
    @JoinColumn({ name: 'userId'})
    user: UsersEntity;

    @ManyToOne(() => OrdersEntity, (order) => order.transactions)
    @JoinColumn({ name: 'orderId'})
    order: OrdersEntity;
}