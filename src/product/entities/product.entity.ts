import { Shop } from "src/shop/entities/shop.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Product {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column({nullable: true, default: 0})
	stock: number;

	@Column()
	thumbnail: string;

	// @Column()
	// category: string;

	@Column()
	createdAt: Date;

	@OneToMany(type => Shop, shop => shop.id)
	shop: Shop;
}
