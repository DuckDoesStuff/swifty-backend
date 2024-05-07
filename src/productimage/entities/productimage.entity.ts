import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity()
export class ProductImage {

	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	url: string;

	@OneToMany(() => Product, product => product.id)
	product: Product;

	@Column()
	createdAt: Date;
}