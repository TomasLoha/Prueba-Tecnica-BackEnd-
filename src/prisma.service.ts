import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	async onModuleInit() {
		await this.$connect();
		console.log('Connected to the database neon');
	}

	async onModuleDestroy() {
		await this.$disconnect();
	}

	constructor() {
		super();

		this.$use(async (params, next) => {
			// Borrado lógico
			if (params.action === 'delete') {
				if (params.args?.hardDelete) {
					delete params.args.hardDelete;
					return next(params); // Borrado real
				}
				params.action = 'update';
				params.args['data'] = {
					deletedAt: new Date(),
					disponible: false,
				};
			}

			if (params.action === 'update' && params.args?.data) {
				const data = params.args.data;

				// Si se está activando de nuevo disponible, borramos deletedAt
				if ('disponible' in data && data.disponible === true) {
					data.deletedAt = null;
				}

				// Si se pone disponible = false y deletedAt no existe, creamos la fecha
				else if ('disponible' in data && data.disponible === false) {
					if (!('deletedAt' in data) || data.deletedAt === null) {
						data.deletedAt = new Date();
					}
				}
			}

			return next(params);
		});
	}
}
