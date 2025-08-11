import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { connect } from 'http2';
import { Type } from 'class-transformer';
import { CreateDetallesFacturaDto } from 'src/detalles-factura/dto/create-detalles-factura.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateProductoDto {
	@ApiProperty({ type: Boolean })
	@IsBoolean()
	disponible: boolean;

	@ApiProperty({ type: String, minLength: 2 })
	@IsString()
	@MinLength(2)
	nombre: string;

	@ApiProperty({ type: Number, minimum: 0 })
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	precioUnitario: number;

	@ApiProperty({ type: String, minLength: 2 })
	@IsString()
	@MinLength(2)
	descripcion: string;

	@ApiProperty({ type: Number })
	@IsNumber()
	@IsNotEmpty()
	stock: number;

	@ApiPropertyOptional({
		type: 'object',
		properties: {
			create: {
				type: 'array',
				items: { $ref: '#/components/schemas/CreateDetallesFacturaDto' },
			},
			connect: {
				type: 'array',
				items: { type: 'object', properties: { id: { type: 'number' } } },
			},
		},
	})
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => CreateDetallesFacturaDto)
	detalleFactura?: {
		create?: CreateDetallesFacturaDto[];
		connect?: { id: number }[];
	};
}
