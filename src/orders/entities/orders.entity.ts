import { IOrder } from "src/interfaces/orders.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { OrderItemsEntity } from "../../order-items/entities/order-items.entity";
import { TransactionsEntity } from "../../transactions/entities/transactions.entity";

@Entity({ name: 'orders' })
export class OrdersEntity extends BaseEntity implements IOrder {
    
    @ManyToOne(() => UsersEntity, (user) => user.orders)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity
    
    @Column()
    payment_type: string;

    @Column()
    order_status: string;

    @Column()
    total_price: number;

    @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.order)
    order_items: OrderItemsEntity[];

    @OneToMany(() => TransactionsEntity, (transactions) => transactions.order)
    transactions: TransactionsEntity[];
}