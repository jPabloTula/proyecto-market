import { BaseEntity } from "../../config/base.entity";
import { ICartItems } from "src/interfaces/cart-items.interface";
import { ProductsEntity } from "../../products/entities/products.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ShoppingSessionEntity } from "../../shopping-session/entities/shopping-session.entity";

@Entity({ name: 'cart_items' })
export class CartItemsEntity extends BaseEntity implements ICartItems {
    
    @ManyToOne(() => ProductsEntity, (product) => product.cart_items)
    @JoinColumn({ name: 'product_id' })
    product: ProductsEntity;

    @ManyToOne(() => ShoppingSessionEntity, (shoppingSession) => shoppingSession.cart_items)
    @JoinColumn({ name: 'session_id' })
    session: ShoppingSessionEntity;

    @Column()
    quantity: number;
}