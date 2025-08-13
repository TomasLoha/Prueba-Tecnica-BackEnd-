import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { FacturasModule } from './facturas/facturas.module';
import { ProductosModule } from './productos/productos.module';
import { AuthModule } from './auth/auth.module';
import { DetallesFacturasModule } from './detalles-facturas/detalles_facturas.module';

@Module({
	imports: [
		UsersModule,
		FacturasModule,
		DetallesFacturasModule,
		ProductosModule,
		AuthModule,
		DetallesFacturasModule,
	],
})
export class AppModule {}
