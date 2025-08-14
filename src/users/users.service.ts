import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { connect } from 'http2';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findByDni(dni: string) {
		return this.prisma.user.findUnique({
			where: { dni },
		});
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
		// const { facturas, ...data } = updateUserDto;
		//validar y simplificar el dni

		return await this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	async remove(id: string) {
		return this.prisma.user.delete({ where: { id } });
	}

	async hardDelete(id: string) {
		return this.prisma.user.delete({
			where: { id },
			hardDelete: true,
		} as unknown as Prisma.UserDeleteArgs);
	}
}
