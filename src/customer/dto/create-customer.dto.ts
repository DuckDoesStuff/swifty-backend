import { IsEmail, IsString } from 'class-validator';



export class CreateCustomerDto {
	@IsEmail()
	email: string;
}
