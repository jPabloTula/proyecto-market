import { BaseEntity } from "src/config/base.entity";
import { IProduct } from "src/interfaces/products.interface";
import { Column, Entity } from "typeorm";

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
}