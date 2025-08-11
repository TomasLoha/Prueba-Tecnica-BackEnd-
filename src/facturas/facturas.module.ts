import { Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
	controllers: [FacturasController],
	providers: [FacturasService, PrismaService],
})
export class FacturasModule {}
