import { IOrder } from "src/interfaces/orders.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

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
}