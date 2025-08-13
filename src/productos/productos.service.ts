import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductosService {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.product.findMany();
	}
	findAvailable() {
		return this.prisma.product.findMany({ where: { disponible: true } });
	}

	findOne(id: string) {
		return this.prisma.product.findUnique({ where: { id } });
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

	async create(createProductoDto: CreateProductoDto) {
		return this.prisma.product.create({ data: createProductoDto });
	}

	async update(id: string, updateProductoDto: UpdateProductoDto) {
		return this.prisma.product.update({
			where: { id },
			data: updateProductoDto,
		});
	}

	async remove(id: string) {
		return this.prisma.product.delete({ where: { id } });
	}
}
