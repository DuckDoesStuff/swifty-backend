import { IsString } from "class-validator";

export class CreateMerchantDto {
	@IsString()
	email: string;
}
