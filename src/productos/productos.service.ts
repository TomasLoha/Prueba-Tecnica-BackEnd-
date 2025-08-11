import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma.service';
@Injectable()
export class ProductosService {
	constructor(private prisma: PrismaService) {}

	create(createProductoDto: CreateProductoDto) {
		return this.prisma.product.create({
			data: createProductoDto,
		});
	}

	findAll() {
		return this.prisma.product.findMany();
	}

	findOne(id: number) {
		return this.prisma.product.findUnique({
			where: { id },
		});
	}

	update(id: number, updateProductoDto: UpdateProductoDto) {
		return this.prisma.product.update({
			where: { id },
			data: updateProductoDto,
		});
	}

	remove(id: number) {
		return this.prisma.product.delete({
			where: { id },
		});
	}
}
