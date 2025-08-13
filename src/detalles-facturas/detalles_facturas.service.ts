import { Injectable } from '@nestjs/common';
import { CreateDetallesFacturaDto } from './dto/create-detalles_factura.dto';
import { UpdateDetallesFacturaDto } from './dto/update-detalles_factura.dto';
import { PrismaService } from 'src/prisma.service';

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

	update(id: string, updateDetallesFacturaDto: UpdateDetallesFacturaDto) {
		const { facturaId, productoId, ...detalleData } = updateDetallesFacturaDto;

		return this.prisma.detalleFactura.update({
			where: { id },
			data: {
				...detalleData,
				factura: { connect: { id: facturaId } },
				producto: { connect: { id: productoId } },
			},
		});
	}

	remove(id: string) {
		return this.prisma.detalleFactura.delete({
			where: { id },
		});
	}
}
