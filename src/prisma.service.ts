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
			if (params.action === 'delete') {
				if (params.args?.hardDelete) {
					delete params.args.hardDelete;
					return next(params); // Borrado real
				}

				// Borrado lógico.
				params.action = 'update';
				params.args['data'] = {
					deletedAt: new Date(Date.now()),
					disponible: false,
				};
			}

			if (params.action === 'update' && params.args?.data) {
				const data = params.args.data;

				if (
					'deleteAt' in data &&
					'deleteAt' != null &&
					'disponible' in data &&
					data.disponible === true
				) {
					data.deletedAt = null;
				}

				// Si disponible es false y la fecha de borrado no está explícitamente definida,
				// se crea una nueva fecha de borrado.
				else if ('disponible' in data && data.disponible === false) {
					if (!('deletedAt' in data) || data.deletedAt === null) {
						data.deletedAt = new Date(Date.now());
					}
				}
			}

			return next(params);
		});
	}
}
