import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetallesFacturaDto } from './dto/create-detalles_factura.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateDetallesFacturaDto } from './dto/update-detalles_factura.dto';

@Injectable()
export class DetallesFacturasService {
	constructor(private prisma: PrismaService) {}

	findAll() {
		return this.prisma.detalleFactura.findMany();
	}

	findAvailable() {
		return this.prisma.detalleFactura.findMany({
			where: {
				disponible: true,
			},
		});
	}

	findOne(id: string) {
		return this.prisma.detalleFactura.findUnique({
			where: { id },
		});
	}
	async paginate(options: { page: number; limit: number }) {
		const { page, limit } = options;
		const skip = (page - 1) * limit;

		const [data, total] = await Promise.all([
			this.prisma.product.findMany({
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

	async create(createDetallesFacturaDto: CreateDetallesFacturaDto) {
		const { facturaId, productoId, ...detalleData } = createDetallesFacturaDto;

		return this.prisma.detalleFactura.create({
			data: {
				...detalleData,
				factura: { connect: { id: facturaId } },
				producto: { connect: { id: productoId } },
			},
		});
	}

	async update(id: string, data: UpdateDetallesFacturaDto) {
		const detalle = await this.prisma.detalleFactura.findUnique({
			where: { id },
			include: { producto: true, factura: true },
		});

		if (!detalle) {
			throw new NotFoundException('Detalle de factura no encontrado');
		}

		let debeRecalcular = false;

		// Verificar si se cambia disponible (de true a false)
		if (
			typeof data.disponible === 'boolean' &&
			data.disponible !== detalle.disponible
		) {
			debeRecalcular = true;
		}

		// Verificar si cambia cantidad
		if (
			typeof data.cantidad === 'number' &&
			data.cantidad !== detalle.cantidad
		) {
			debeRecalcular = true;
		}

		// Actualizar subtotal internamente si cambió cantidad
		let nuevoSubtotal = detalle.subtotal;
		if (typeof data.cantidad === 'number') {
			nuevoSubtotal = detalle.producto.precioUnitario * data.cantidad;
		}

		// Actualizar detalleFactura
		const updatedDetalle = await this.prisma.detalleFactura.update({
			where: { id },
			data: {
				...data,
				subtotal: nuevoSubtotal,
			},
		});

		// Si hay que recalcular, actualizar total de la factura
		if (debeRecalcular) {
			const detallesFactura = await this.prisma.detalleFactura.findMany({
				where: {
					facturaId: detalle.facturaId,
					disponible: true, // solo sumamos los disponibles
				},
			});

			const nuevoTotal = detallesFactura.reduce(
				(acc, df) => acc + df.subtotal,
				0,
			);

			await this.prisma.factura.update({
				where: { id: detalle.facturaId },
				data: { total: nuevoTotal },
			});
		}

		return updatedDetalle;
	}

	remove(id: string) {
		return this.prisma.detalleFactura.delete({
			where: { id },
		});
	}
}
