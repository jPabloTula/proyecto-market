import { BaseEntity } from "../../config/base.entity";
import { ICartItems } from "src/interfaces/cart-items.interface";
import { Column, Entity } from "typeorm";

@Entity({ name: 'cart_items' })
export class CartItemsEntity extends BaseEntity implements ICartItems {
    @Column()
    productId: string;

    @Column()
    sessionId: string;

    @Column()
    quantity: number;
}