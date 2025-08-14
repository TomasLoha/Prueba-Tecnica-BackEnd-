import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsEmail,
	IsNotEmpty,
	IsString,
	Length,
} from 'class-validator';

export class LoginDto {
	@ApiProperty({
		description: 'DNI del usuario (8 caracteres)',
		example: '12345678',
	})
	@IsString()
	@Length(8, 8)
	dni: string;

	@ApiProperty({
		description: 'Contraseña del usuario',
		example: 'password123',
	})
	@IsString()
	@Length(6, 20)
	password: string;

	// @IsBoolean()
	// @Transform(({ value }) => value === 'true')
	// rememberMe?: boolean;
}
