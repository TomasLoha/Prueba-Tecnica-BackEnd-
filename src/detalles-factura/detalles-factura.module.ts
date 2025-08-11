import { Module } from '@nestjs/common';
import { DetallesFacturaService } from './detalles-factura.service';
import { DetallesFacturaController } from './detalles-factura.controller';

@Module({
  controllers: [DetallesFacturaController],
  providers: [DetallesFacturaService],
})
export class DetallesFacturaModule {}
