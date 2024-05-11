import { Merchant } from "src/merchant/entities/merchant.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";


@Entity()
export class Shop {
	@PrimaryColumn({unique: true})
	nameId: string;
	
	@Column()
	displayName: string;
	
	@Column()
	description: string;

	@Column()
	address: string;

	@Column()
	phone: string;

	@Column({nullable: true})
	logo: string;

	@Column({nullable: true, default: 0})
	sold: number;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => Merchant, merchant => merchant.shops)
	merchant: Merchant;

	@OneToMany(() => Product, product => product.shop)
	products: Product[];
}
