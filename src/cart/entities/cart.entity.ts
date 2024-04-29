import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
	@PrimaryGeneratedColumn()
	id: number;

	// @ManyToOne(type => Product)
	// items: Product[];

	@OneToOne(type => Customer, customer => customer.cart)
	customer: Customer;
}
