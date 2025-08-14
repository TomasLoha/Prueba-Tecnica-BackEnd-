import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdateDetallesFacturaDto {
	@ApiProperty({
		description: 'Indica si el producto está disponible',
		example: true,
	})
	@IsOptional()
	@IsBoolean()
	disponible?: boolean;

	@ApiProperty({
		description: 'Cantidad del producto',
		example: 2,
	})
	@IsOptional()
	@IsInt()
	cantidad?: number;
}
