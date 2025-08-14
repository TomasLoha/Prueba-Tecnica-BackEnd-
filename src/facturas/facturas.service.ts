import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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

	async findOneDataFactura(id: string) {
		return this.prisma.factura.findUnique({
			where: { id },
			include: { detalleFactura: true },
		});
	}
	async findAllDataFactura() {
		return this.prisma.factura.findMany({
			include: { detalleFactura: true },
		});
	}

	async create(createFacturaDto: CreateFacturaDto) {
		const { usuarioId, detalleFactura, ...facturaData } = createFacturaDto;

		// Inicia una transacción para garantizar la atomicidad de las operaciones.
		// Si alguna parte falla, todas las operaciones se revierten.
		return this.prisma.$transaction(async (prisma) => {
			let totalFactura = 0;

			// 1. Obtener los productos y calcular los subtotales en el servidor.
			// Usamos Promise.all para hacer las consultas a la base de datos de manera concurrente.
			const detallesConCalculos = await Promise.all(
				detalleFactura.map(async (detalle) => {
					// Buscamos el precio del producto para calcular el subtotal.
					const producto = await prisma.product.findUnique({
						where: { id: detalle.productoId },
						select: { precioUnitario: true },
					});

					// Si el producto no existe, lanzamos una excepción.
					if (!producto) {
						throw new NotFoundException(
							`Producto con ID ${detalle.productoId} no encontrado.`,
						);
					}

					// Calculamos el subtotal del detalle. Esto evita que el cliente envíe valores incorrectos.
					const subtotalCalculado = detalle.cantidad * producto.precioUnitario;

					// Acumulamos el subtotal para el total final de la factura.
					totalFactura += subtotalCalculado;

					// Devolvemos el objeto del detalle de factura listo para ser creado.
					// Aquí no es necesario `...detalle` ya que recalculamos el subtotal.
					return {
						subtotal: subtotalCalculado,
						cantidad: detalle.cantidad,
						disponible: detalle.disponible,
						// Conectamos el detalle con el producto.
						producto: { connect: { id: detalle.productoId } },
					};
				}),
			);

			// 2. Crear la factura y sus detalles en una única operación anidada.
			return prisma.factura.create({
				data: {
					...facturaData,
					total: totalFactura, // Asignamos el total calculado por el backend.
					usuario: {
						connect: { id: usuarioId },
					},
					detalleFactura: {
						create: detallesConCalculos,
					},
				},
				include: {
					detalleFactura: true, // Incluimos los detalles en la respuesta.
				},
			});
		});
	}

	async update(id: string, updateFacturaDto: UpdateFacturaDto) {
		const { usuarioId, detalleFactura, ...facturaData } = updateFacturaDto;

		// Verificar que la factura exista
		const existingFactura = await this.prisma.factura.findUnique({
			where: { id },
			include: { detalleFactura: true },
		});
		if (!existingFactura) {
			throw new NotFoundException(`Factura con ID ${id} no encontrada.`);
		}

		return this.prisma.$transaction(async (prisma) => {
			//Actualizar cada detalle usando su ID
			if (detalleFactura && detalleFactura.length > 0) {
				for (const detalle of detalleFactura) {
					const existingDetalle = existingFactura.detalleFactura.find(
						(d) => d.id === detalle.id,
					);
					if (!existingDetalle) {
						throw new NotFoundException(
							`Detalle con ID ${detalle.id} no encontrado en la factura.`,
						);
					}

					// Valores actuales si no vienen en el PATCH
					const cantidad = detalle.cantidad ?? existingDetalle.cantidad;
					const disponible = detalle.disponible ?? existingDetalle.disponible;
					const productoId = detalle.productoId ?? existingDetalle.productoId;

					// Recalcular subtotal desde DB
					const producto = await prisma.product.findUnique({
						where: { id: productoId },
						select: { precioUnitario: true },
					});
					if (!producto) {
						throw new NotFoundException(
							`Producto con ID ${productoId} no encontrado.`,
						);
					}
					if (cantidad <= 0) {
						throw new BadRequestException(
							`La cantidad del producto con ID ${productoId} debe ser mayor que cero.`,
						);
					}
					const subtotalCalculado = cantidad * producto.precioUnitario;

					await prisma.detalleFactura.update({
						where: { id: detalle.id },
						data: {
							cantidad,
							disponible,
							subtotal: subtotalCalculado,
						},
					});
				}
			}

			//Recalcular el total de la factura
			const detallesActualizados = await prisma.detalleFactura.findMany({
				where: { facturaId: id },
				select: { subtotal: true },
			});
			const totalFactura = detallesActualizados.reduce(
				(acc, d) => acc + d.subtotal,
				0,
			);

			//Actualizar factura principal
			return prisma.factura.update({
				where: { id },
				data: {
					...facturaData,
					total: totalFactura,
					...(usuarioId && { usuario: { connect: { id: usuarioId } } }),
				},
				include: { detalleFactura: true },
			});
		});
	}

	remove(id: string) {
		return this.prisma.factura.delete({ where: { id } });
	}
}
