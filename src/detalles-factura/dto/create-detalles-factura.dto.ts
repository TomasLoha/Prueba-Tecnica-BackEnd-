import { IsBoolean, IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDetallesFacturaDto {
	@ApiProperty({ type: Boolean, description: 'Indica si está disponible' })
	@IsBoolean()
	disponible: boolean;

	@ApiProperty({
		type: Number,
		minimum: 0,
		description: 'Subtotal del detalle',
	})
	@IsNumber()
	@Min(0)
	subtotal: number;

	@ApiProperty({
		type: Number,
		minimum: 1,
		description: 'Cantidad de productos',
	})
	@IsInt()
	@Min(1)
	cantidad: number;

	@ApiProperty({ type: Number, description: 'ID del producto', example: 1 })
	@IsNumber()
	@IsNotEmpty()
	productoId: number;

	@ApiProperty({ type: Number, description: 'ID de la factura', example: 1 })
	@IsNumber()
	@IsNotEmpty()
	facturaId: number;
}
