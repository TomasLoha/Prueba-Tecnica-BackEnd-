import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	Length,
} from 'class-validator';

export class LoginDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@Length(6, 20)
	password: string;

	@IsBoolean()
	@Transform(({ value }) => value === 'true')
	rememberMe?: boolean;
}
