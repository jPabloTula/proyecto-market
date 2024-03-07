import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { CartItemsEntity } from "../../cart-items/entities/cart-items.entity";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";

@Entity({ name: 'shopping-session' })
export class ShoppingSessionEntity extends BaseEntity {
    
    @OneToOne(() => UsersEntity, (user) => user.shoppingSession)
    @JoinColumn({ name: 'userId' })
    user: UsersEntity;

    @OneToMany(() => CartItemsEntity, (cartItems) => cartItems.session)
    cartItems: CartItemsEntity[];
}