import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	ValidateNested,
} from 'class-validator';
import { createDetalleFacturaFFacturaDto } from 'src/detalles-facturas/dto/create-detalle-from-factura';
import { CreateDetallesFacturaDto } from 'src/detalles-facturas/dto/create-detalles_factura.dto';

export class CreateFacturaDto {
	@ApiProperty({
		description: 'Indica si el producto está disponible',
		example: true,
	})
	@IsBoolean()
	disponible: boolean;

	@ApiProperty({
		description: 'Fecha de la factura',
		example: '2023-01-01',
	})
	@Type(() => Date)
	@IsDate()
	fecha: Date;

	@ApiPropertyOptional({
		description: 'Total de la factura (se calcula en el backend)',
		example: 150.75,
	})
	@IsOptional()
	@IsNumber()
	total?: number;

	@ApiProperty({
		description: 'Nombre de fantasía del cliente',
		example: 'Tienda de Ejemplo',
	})
	@IsString()
	nombreFantasia: string;

	@ApiProperty({
		description: 'Fecha de fundación del cliente',
		example: '2020-01-01',
	})
	@IsString()
	fechaFundacion: string;

	@ApiPropertyOptional({
		description: 'Fecha de eliminación de la factura',
		example: '2023-01-01',
	})
	@IsOptional()
	@Type(() => Date)
	@IsDate()
	deletedAt: Date;

	@ApiProperty({
		description: 'ID del usuario que creó la factura',
	})
	@IsNotEmpty()
	@IsUUID()
	usuarioId: string;

	@ApiProperty({
		description: 'Detalles de la factura',
	})
	@IsNotEmpty()
	@ValidateNested({ each: true })
	@Type(() => createDetalleFacturaFFacturaDto)
	detalleFactura: createDetalleFacturaFFacturaDto[];
}
