import { Injectable } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FacturasService {
	constructor(private prisma: PrismaService) {}
	async create(createFacturaDto: CreateFacturaDto) {
		return this.prisma.factura.create({
			data: createFacturaDto,
		});
	}

	async findAll() {
		return this.prisma.factura.findMany();
	}

	findOne(id: number) {
		return this.prisma.factura.findUnique({
			where: { id },
		});
	}

	async update(id: number, updateFacturaDto: UpdateFacturaDto) {
		return this.prisma.factura.update({
			where: { id },
			data: updateFacturaDto,
		});
	}

	async remove(id: number) {
		return this.prisma.factura.delete({
			where: { id },
		});
	}
}
