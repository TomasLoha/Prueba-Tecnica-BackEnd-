import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator';

export class CreateProductoDto {
	@ApiProperty({
		description: 'Indica si el producto está disponible',
		example: true,
	})
	@IsBoolean()
	disponible: boolean;

	@ApiProperty({
		description: 'Nombre del producto',
		example: 'Camiseta',
	})
	@IsString()
	nombre: string;

	@ApiProperty({
		description: 'Precio unitario del producto',
		example: 19.99,
	})
	@IsNumber()
	precioUnitario: number;

	@ApiProperty({
		description: 'Descripción del producto',
		example: 'Camiseta de algodón',
	})
	@IsString()
	descripcion: string;

	@ApiProperty({
		description: 'Cantidad en stock del producto',
		example: 100,
	})
	@IsNumber()
	stock: number;

	// @ApiPropertyOptional({
	// 	description: 'Fecha de eliminación del producto',
	// 	example: '2023-01-01T00:00:00Z',
	// })
	// @IsOptional()
	// @Type(() => Date)
	// @IsDate()
	// deletedAt: Date;
}
