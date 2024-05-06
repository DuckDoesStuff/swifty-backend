import { Merchant } from "src/merchant/entities/merchant.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Shop {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({unique: true})
	name: string;

	@Column()
	description: string;

	@Column()
	address: string;

	@Column()
	phone: string;

	@Column({nullable: true})
	logo: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(type => Merchant, merchant => merchant.shops)
	merchant: Merchant;

	@ManyToOne(type => Product, product => product.id)
	@JoinColumn()
	products: Product[];
}
