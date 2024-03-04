import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: 'shopping-session' })
export class ShoppingSessionEntity extends BaseEntity {
    
    @ManyToOne(() => UsersEntity, (user) => user.shoppingSession)
    @JoinColumn({ name: 'userId' })
    user: UsersEntity;
}