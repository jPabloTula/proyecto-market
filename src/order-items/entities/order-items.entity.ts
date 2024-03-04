import { Column, Entity } from 'typeorm';
import { IOrderItems } from './../../../dist/src/interfaces/order-items.interface.d';
import { BaseEntity } from "src/config/base.entity";

@Entity({ name: 'order-items'})
export class OrderItemsEntity extends BaseEntity implements IOrderItems {
    productId: string;
    orderId: string;
    
    @Column()
    quantity: number;

    @Column()
    price: number;
}