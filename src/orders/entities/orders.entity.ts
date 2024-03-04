import { IOrder } from "src/interfaces/orders.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { OrderItemsEntity } from "../../order-items/entities/order-items.entity";
import { TransactionsEntity } from "../../transactions/entities/transactions.entity";

@Entity({ name: 'orders' })
export class OrdersEntity extends BaseEntity implements IOrder {
    
    @ManyToOne(() => UsersEntity, (user) => user.orders)
    @JoinColumn({ name: 'userId' })
    user: UsersEntity
    
    @Column()
    paymentType: string;

    @Column()
    orderStatus: string;

    @Column()
    totalPrice: number;

    @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.order)
    orderItems: OrderItemsEntity[];

    @OneToMany(() => TransactionsEntity, (transactions) => transactions.order)
    transactions: TransactionsEntity[];
}