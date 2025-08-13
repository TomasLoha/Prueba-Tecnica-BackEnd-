import { Module } from '@nestjs/common';
import { DetallesFacturasService } from './detalles_facturas.service';
import { DetallesFacturasController } from './detalles_facturas.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [DetallesFacturasController],
	providers: [DetallesFacturasService],
})
export class DetallesFacturasModule {}
