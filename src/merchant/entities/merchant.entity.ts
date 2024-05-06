import { Shop } from "src/shop/entities/shop.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Merchant {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column({nullable: true})
	name: string;

	@Column({nullable: true})
	phone: string;

	@Column({nullable: true})
	avatar: string;

	@OneToMany(type => Shop, shop => shop.merchant)
	shops: Shop[];
}
