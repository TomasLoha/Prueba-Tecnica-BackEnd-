import { IsBoolean, IsInt, IsOptional } from 'class-validator';

export class UpdateDetallesFacturaDto {
	@IsOptional()
	@IsBoolean()
	disponible?: boolean;

	@IsOptional()
	@IsInt()
	cantidad?: number;
}
