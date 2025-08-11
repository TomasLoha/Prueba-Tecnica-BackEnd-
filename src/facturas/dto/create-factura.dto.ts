import {
	IsBoolean,
	IsDate,
	IsNumber,
	IsString,
	IsOptional,
	IsArray,
	ValidateNested,
	IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDetallesFacturaDto } from 'src/detalles-factura/dto/create-detalles-factura.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFacturaDto {
	@ApiProperty()
	@IsBoolean()
	disponible: boolean;

	@ApiProperty({ type: String, format: 'date-time' })
	@Type(() => Date)
	@IsDate()
	fecha: Date;

	@ApiProperty()
	@IsNumber()
	total: number;

	@ApiProperty()
	@IsString()
	nombreFantasia: string;

	@ApiProperty()
	@IsString()
	fechaFundacion: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	usuarioId: number;

	@ApiPropertyOptional({
		type: 'object',
		properties: {
			create: {
				type: 'array',
				items: { $ref: '#/components/schemas/CreateDetallesFacturaDto' },
			},
		},
	})
	@IsOptional()
	@ValidateNested({ each: true })
	@Type(() => CreateDetallesFacturaDto)
	detalleFactura?: {
		create?: CreateDetallesFacturaDto[];
	};
}
