import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class ProductImage {

	@PrimaryGeneratedColumn()
	id: string;

	@Column()
	url: string;

	@ManyToOne(() => Product, product => product.id)
	@JoinColumn()
	product: Product;

	@CreateDateColumn()
	createdAt: Date;
}