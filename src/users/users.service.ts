import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createUserDto: CreateUserDto) {
		return this.prisma.user.create({
			data: createUserDto,
		});
	}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async findOne(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
		});
	}

	async update(id: string, updateUserDto: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	async remove(id: string) {
		return this.prisma.user.delete({
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
}
