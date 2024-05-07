import { ProductImage } from "src/productimage/entities/productimage.entity";
import { Shop } from "src/shop/entities/shop.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Product {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	price: number;

	@Column({nullable: true, default: 0})
	stock: number;

	@OneToMany(() => ProductImage, productImage => productImage.id)
	productImage: ProductImage[];

	@CreateDateColumn()
	createdAt: Date;

	@OneToMany(type => Shop, shop => shop.nameId)
	shop: Shop;
}
