import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateDetallesFacturaDto {
	@ApiProperty({
		description: 'Indica si el producto está disponible',
		example: true,
	})
	@IsBoolean()
	disponible: boolean;

	@ApiPropertyOptional({
		description: 'Subtotal del producto',
		example: 100.0,
	})
	@IsNumber()
	subtotal: number;

	@ApiProperty({
		description: 'Cantidad del producto',
		example: 2,
	})
	@IsNumber()
	@IsNotEmpty()
	cantidad: number;

	@ApiProperty({
		description: 'ID del producto',
		example: 'abc123',
	})
	@IsString()
	@IsNotEmpty()
	productoId: string;

	@ApiProperty({
		description: 'ID de la factura',
		example: 'xyz789',
	})
	@IsString()
	@IsNotEmpty()
	facturaId: string;
}
