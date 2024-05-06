import { IsDate, IsString } from "class-validator";


export class CreateShopDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	address: string;

	@IsString()
	phone: string;

	@IsString()
	logo: string;
}
