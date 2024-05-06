import { IsDate, IsNumber, IsString } from "class-validator";



export class CreateProductDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsNumber()
	price: number;

	@IsNumber()
	stock: number;

	@IsString()
	image: string;

	// @IsString()
	// category: string;

	@IsDate()
	createdAt: Date;
}
