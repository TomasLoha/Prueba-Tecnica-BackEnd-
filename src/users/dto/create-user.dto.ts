import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDateString,
	IsNumber,
	IsOptional,
	isString,
	IsString,
	Length,
	MaxLength,
	ValidateNested,
} from 'class-validator';
import { connect } from 'http2';
import { CreateFacturaDto } from 'src/facturas/dto/create-factura.dto';

export class CreateUserDto {
	@IsBoolean()
	disponible: boolean;

	@IsDateString()
	fechaNacimiento: string; // Use string for ISO date representation

	@IsString()
	@Length(8, 8)
	dni: string;

	@IsString()
	@MaxLength(100)
	nombreCompleto: string;

	@IsString()
	@MaxLength(10)
	sexo: string;

	@IsString()
	@MaxLength(20)
	estadoCivil: string;

	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => CreateFacturaDto)
	facturas?: {
		create?: CreateFacturaDto[];
		connect?: { id: number }[];
	};
}
