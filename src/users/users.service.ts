import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { connect } from 'http2';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findAvailable() {
		return this.prisma.user.findMany({
			where: { disponible: true },
		});
	}

	async findOne(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	async paginate(options: { page: number; limit: number }) {
		const { page, limit } = options;
		const skip = (page - 1) * limit;

		const [data, total] = await Promise.all([
			this.prisma.user.findMany({
				skip,
				take: limit,
			}),
			this.prisma.user.count(),
		]);

		const totalPages = Math.ceil(total / limit);

		return {
			data,
			total,
			page,
			totalPages,
		};
	}

	async create(createUserDto: CreateUserDto) {
		const isDniUnique = await this.prisma.user.findUnique({
			where: { dni: createUserDto.dni },
		});
		if (isDniUnique) {
			throw new Error('El DNI ya está en uso');
		}
		const { facturas, ...userData } = createUserDto;
		const data: any = {
			...userData,
		};

		if (facturas && facturas.length > 0) {
			data.facturas = {
				create: facturas,
			};
		}

		return this.prisma.user.create({
			data,
		});
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		const { facturas, ...userData } = updateUserDto;

		// Se usa una transacción para garantizar que todas las operaciones de la BD
		// se completen correctamente o se reviertan si algo falla.
		return this.prisma.$transaction(async (prisma) => {
			// 1. Actualizar las propiedades del usuario
			const updatedUser = await prisma.user.update({
				where: { id },
				data: userData,
			});

			// 2. Gestionar la relación con las facturas
			if (facturas && facturas.length > 0) {
				// Separa los detalles según su estado (con ID, sin ID)
				const detallesExistentes = facturas.filter((f) => f.id);
				const detallesNuevos = facturas.filter((f) => !f.id);

				// a) Desconectar las facturas que no están en el DTO
				const currentFacturaIds = detallesExistentes.map((f) => f.id);
				await prisma.factura.updateMany({
					where: {
						usuarioId: id,
						NOT: {
							id: { in: currentFacturaIds },
						},
					},
					data: {
						usuarioId: null,
					},
				});

				// b) Conectar las facturas existentes que ahora se asignan a este usuario
				const facturasParaConectar = detallesExistentes
					.filter((f) => !f.usuarioId) // Solo si no tienen un usuario asignado
					.map((f) => f.id);

				if (facturasParaConectar.length > 0) {
					await prisma.factura.updateMany({
						where: { id: { in: facturasParaConectar } },
						data: {
							usuarioId: id,
						},
					});
				}

				// c) Actualizar los detalles existentes de este usuario
				for (const factura of detallesExistentes) {
					await prisma.factura.update({
						where: { id: factura.id },
						data: { ...factura }, // Actualiza los campos de la factura
					});
				}

				// d) Crear los nuevos detalles
				if (detallesNuevos.length > 0) {
					await prisma.factura.createMany({
						data: detallesNuevos.map((f) => ({ ...f, usuarioId: id })),
					});
				}
			}

			// 3. Devolver el usuario actualizado con todas las relaciones
			return prisma.user.findUnique({
				where: { id },
				include: { facturas: true },
			});
		});
	}

	async remove(id: string) {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
