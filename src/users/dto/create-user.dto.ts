import {
	IsBoolean,
	IsDate,
	IsNotIn,
	IsOptional,
	IsString,
	Length,
	ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateFacturaDto } from 'src/facturas/dto/create-factura.dto';

export class CreateUserDto {
	@ApiProperty({
		description: 'Indica si el usuario está disponible',
		example: true,
	})
	@IsBoolean()
	disponible: boolean;

	@ApiProperty({
		description: 'Fecha de nacimiento del usuario',
		example: '1990-01-01T00:00:00.000Z',
		type: String,
	})
	@Type(() => Date)
	@IsDate()
	fechaNacimiento: Date;

	@ApiProperty({
		description: 'DNI del usuario (8 caracteres)',
		example: '12345678',
	})
	@IsString()
	@Length(8, 8)
	dni: string;

	@ApiProperty({
		description: 'Nombre completo del usuario',
		example: 'Juan Pérez',
	})
	@IsString()
	nombreCompleto: string;

	@ApiProperty({ description: 'Sexo del usuario', example: 'Masculino' })
	@IsString()
	sexo: string;

	@ApiProperty({ description: 'Estado civil del usuario', example: 'Soltero' })
	@IsString()
	estadoCivil: string;

	@ApiPropertyOptional({
		description: 'Fecha de eliminación del usuario, no rellenar',
		example: '2024-01-01T00:00:00.000Z',
		required: false,
		type: String,
	})
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	deletedAt?: Date;

	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => CreateFacturaDto)
	facturas?: CreateFacturaDto[];
}
