import { BaseEntity } from "../../config/base.entity";
import { ICartItems } from "src/interfaces/cart-items.interface";
import { ProductsEnntity } from "../../products/entities/products.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'cart_items' })
export class CartItemsEntity extends BaseEntity implements ICartItems {
    
    @ManyToOne(() => ProductsEnntity, (product) => product.cartItems)
    @JoinColumn({ name: 'productId' })
    product: ProductsEnntity;

    @Column()
    sessionId: string;

    @Column()
    quantity: number;
}