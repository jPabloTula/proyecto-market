import { Exclude } from "class-transformer";
import { BaseEntity } from "../../config/base.entity";
import { LEVEL_AUTHORITY } from "../../constants/level-authority";
import { IUser } from "src/interfaces/users.interface";
import { OrdersEntity } from "../../orders/entities/orders.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { ShoppingSessionEntity } from "../../shopping-session/entities/shopping-session.entity";
import { WalletEntity } from "../../wallet/entities/wallet.entity";
import { TransactionsEntity } from "../../transactions/entities/transactions.entity";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    picture: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    activated: boolean;

    @Column({ type: 'enum', enum: LEVEL_AUTHORITY })
    levelAuthority: LEVEL_AUTHORITY;

    @OneToMany(() => OrdersEntity, (order) => order.user)
    orders: OrdersEntity[];

    @OneToOne(() => ShoppingSessionEntity, (shoppingSession) => shoppingSession.user)
    shoppingSession: ShoppingSessionEntity;

    @OneToOne(() => WalletEntity, (wallet) => wallet.user)
    wallet: WalletEntity;

    @OneToMany(() => TransactionsEntity, (transaction) => transaction.user)
    transactions: TransactionsEntity[];

}