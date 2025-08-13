import { Module } from '@nestjs/common';
import { DetallesFacturasService } from './detalles_facturas.service';
import { DetallesFacturasController } from './detalles_facturas.controller';

@Module({
  controllers: [DetallesFacturasController],
  providers: [DetallesFacturasService],
})
export class DetallesFacturasModule {}
