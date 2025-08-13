import { PartialType } from '@nestjs/swagger';
import { CreateDetallesFacturaDto } from './create-detalles_factura.dto';

export class UpdateDetallesFacturaDto extends PartialType(CreateDetallesFacturaDto) {}
