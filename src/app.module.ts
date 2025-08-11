import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { FacturasModule } from './facturas/facturas.module';
import { DetallesFacturaModule } from './detalles-factura/detalles-factura.module';
import { ProductosModule } from './productos/productos.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		UsersModule,
		FacturasModule,
		DetallesFacturaModule,
		ProductosModule,
		AuthModule,
	],
})
export class AppModule {}
