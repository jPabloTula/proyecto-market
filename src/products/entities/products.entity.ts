import { CartItemsEntity } from "../../cart-items/entities/cart-items.entity";
import { BaseEntity } from "../../config/base.entity";
import { IProduct } from "src/interfaces/products.interface";
import { OrderItemsEntity } from "../../order-items/entities/order-items.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({ name: 'products' })
export class ProductsEnntity extends BaseEntity implements IProduct {
    
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column()
    category: string;

    @Column()
    description: string;

    @Column()
    activated: boolean;

    @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.product)
    orderItems: OrderItemsEntity[];

    @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.product)
    cartItems: CartItemsEntity[];
}