import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from "../../config/base.entity";
import { IOrderItems } from 'src/interfaces/order-items.interface';
import { OrdersEntity } from '../../orders/entities/orders.entity';
import { ProductsEntity } from '../../products/entities/products.entity';

@Entity({ name: 'order-items'})
export class OrderItemsEntity extends BaseEntity implements IOrderItems {
    
    @ManyToOne(() => ProductsEntity, (product) => product.order_items)
    @JoinColumn({ name: 'product_id'})
    product: ProductsEntity;

    @ManyToOne(() => OrdersEntity, (order) => order.order_items)
    @JoinColumn({ name: 'order_id'})
    order: OrdersEntity;
    
    @Column()
    quantity: number;

    @Column()
    price: number;


}