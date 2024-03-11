import { CartItemsEntity } from "../../cart-items/entities/cart-items.entity";
import { BaseEntity } from "../../config/base.entity";
import { IProduct } from "src/interfaces/products.interface";
import { OrderItemsEntity } from "../../order-items/entities/order-items.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { IsInt, Min, Validate } from "class-validator";
import { IsNotNegative } from "../../utils/validator.negative";

@Entity({ name: 'products' })
export class ProductsEntity extends BaseEntity implements IProduct {

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({ type: 'int' })
    @IsInt()
    @Min(0)
    @Validate(IsNotNegative)
    stock: number;

    @Column()
    category: string;

    @Column()
    description: string;

    @Column({ default: 1})
    activated: number;

    @OneToMany(() => OrderItemsEntity, (orderItems) => orderItems.product)
    order_items: OrderItemsEntity[];

    @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.product)
    cart_items: CartItemsEntity[];
}