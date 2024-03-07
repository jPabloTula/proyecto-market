import { BaseEntity } from "../../config/base.entity";
import { ICartItems } from "src/interfaces/cart-items.interface";
import { ProductsEntity } from "../../products/entities/products.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ShoppingSessionEntity } from "../../shopping-session/entities/shopping-session.entity";

@Entity({ name: 'cart_items' })
export class CartItemsEntity extends BaseEntity implements ICartItems {
    
    @ManyToOne(() => ProductsEntity, (product) => product.cartItems)
    @JoinColumn({ name: 'productId' })
    product: ProductsEntity;

    @ManyToOne(() => ShoppingSessionEntity, (shoppingSession) => shoppingSession.cartItems)
    @JoinColumn({ name: 'sessionId' })
    session: ShoppingSessionEntity;

    @Column()
    quantity: number;
}