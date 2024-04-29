import { Cart } from "src/cart/entities/cart.entity"
import { Column, JoinColumn, OneToOne, Entity, PrimaryGeneratedColumn, Unique } from "typeorm"



@Entity()
@Unique(['email'])
export class Customer {
	@PrimaryGeneratedColumn()
	id:number

	@Column()
	email:string

	@Column({nullable:true})
	username:string

	@OneToOne(type => Cart, cart => cart.customer)
	@JoinColumn()
	cart: Cart
}
