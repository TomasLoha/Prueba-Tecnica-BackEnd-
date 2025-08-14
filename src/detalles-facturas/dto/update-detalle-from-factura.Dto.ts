import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsBoolean,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

export class updateDetalleFromFacturaDto {
	@IsUUID()
	@IsNotEmpty()
	id: string;

	@ApiProperty({
		description: 'Indica si el producto está disponible',
		example: true,
	})
	@IsBoolean()
	disponible?: boolean;

	@IsNumber()
	subtotal?: number;

	@ApiProperty({
		description: 'Cantidad del producto',
		example: 2,
	})
	@IsNumber()
	@IsNotEmpty()
	cantidad?: number;

	@ApiProperty({
		description: 'ID del producto',
		example: 'abc123',
	})
	@IsString()
	@IsNotEmpty()
	productoId: string;
}
