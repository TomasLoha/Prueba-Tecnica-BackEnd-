import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaService } from 'src/prisma.service';
import { DetallesFacturasService } from 'src/detalles-facturas/detalles_facturas.service';

@Injectable()
export class FacturasService {
	constructor(private readonly prisma: PrismaService) {}

	private detallesService: DetallesFacturasService;

	findAll() {
		return this.prisma.factura.findMany();
	}

	findAvailable() {
		return this.prisma.factura.findMany({ where: { disponible: true } });
	}

	findOne(id: string) {
		return this.prisma.factura.findUnique({ where: { id } });
	}

	async paginate(options: { page: number; limit: number }) {
		const { page, limit } = options;
		const skip = (page - 1) * limit;

		const [data, total] = await Promise.all([
			this.prisma.factura.findMany({
				skip,
				take: limit,
			}),
			this.prisma.product.count(),
		]);

		const totalPages = Math.ceil(total / limit);

		return {
			data,
			total,
			page,
			totalPages,
		};
	}
	async create(createFacturaDto: CreateFacturaDto) {
		const { usuarioId, detalleFactura, ...facturaData } = createFacturaDto;

		return this.prisma.factura.create({
			data: {
				...facturaData,
				usuario: {
					connect: { id: usuarioId },
				},
				detalleFactura: {
					create: detalleFactura,
				},
			},
		});
	}
	async update(id: string, updateFacturaDto: UpdateFacturaDto) {
		const { usuarioId, detalleFactura, ...facturaData } = updateFacturaDto;

		// 1. Verificar si la factura existe
		const facturaExistente = await this.prisma.factura.findUnique({
			where: { id },
		});
		if (!facturaExistente) {
			throw new Error('Factura no encontrada');
		}

		// 2. Verificar si el usuario existe
		const usuario = await this.prisma.user.findUnique({
			where: { id: usuarioId },
		});
		if (!usuario) {
			throw new Error('Usuario no encontrado');
		}

		// 3. Actualizar la factura
		await this.prisma.factura.update({
			where: { id },
			data: {
				...facturaData,
				usuario: {
					connect: { id: usuarioId },
				},
				...(detalleFactura &&
					detalleFactura.length > 0 && {
						detalleFactura: {
							deleteMany: {}, // borra los detalles anteriores
							create: detalleFactura, // agrega los nuevos
						},
					}),
			},
		});

		// 4. Devolver factura actualizada con detalles
		return this.prisma.factura.findUnique({
			where: { id },
			include: { detalleFactura: true },
		});
	}

	remove(id: string) {
		return this.prisma.factura.delete({ where: { id } });
	}
}
