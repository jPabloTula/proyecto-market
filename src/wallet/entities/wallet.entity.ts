import { BaseEntity } from "../../config/base.entity";
import { IWallet } from "src/interfaces/wallet.interface";
import { UsersEntity } from "../../users/entities/users.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity({ name: 'wallet'})
export class WalletEntity extends BaseEntity implements IWallet{
    
    @Column({ default: 5000 })
    balance: number; 

    @Column({ default: 'usd' })
    moneyType: string;

    @OneToOne(() => UsersEntity, (user) => user.wallet)
    @JoinColumn({ name: 'userId' })
    user: UsersEntity;
}