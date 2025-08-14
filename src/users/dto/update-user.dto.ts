import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
	IsBoolean,
	IsDate,
	IsNotEmpty,
	IsString,
	Length,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateUserDto {
	@ApiProperty({
		description: 'Indica si el usuario está disponible',
		example: true,
	})
	@IsBoolean()
	disponible?: boolean;

	@ApiProperty({
		description: 'Fecha de nacimiento del usuario',
		example: '1990-01-01T00:00:00.000Z',
		type: String,
	})
	@Type(() => Date)
	@IsDate()
	fechaNacimiento?: Date;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	password?: string;

	@ApiProperty({
		description: 'DNI del usuario (8 caracteres)',
		example: '12345678',
	})
	@IsString()
	@Length(8, 8)
	dni?: string;

	@ApiProperty({
		description: 'Nombre completo del usuario',
		example: 'Juan Pérez',
	})
	@IsString()
	nombreCompleto?: string;

	@ApiProperty({ description: 'Sexo del usuario', example: 'Masculino' })
	@IsString()
	sexo?: string;

	@ApiProperty({ description: 'Estado civil del usuario', example: 'Soltero' })
	@IsString()
	estadoCivil?: string;
}
