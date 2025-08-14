import {
	BadRequestException,
	Body,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(@Body() registerDto: RegisterDto) {
		const user = await this.usersService.findByDni(registerDto.dni);

		if (user) {
			throw new BadRequestException('El usuario ya existe');
		}
		const { password, ...data } = registerDto;
		const hashedPassword = await bcrypt.hash(password, 10);
		return this.usersService.create({ ...data, password: hashedPassword });
	}

	async login(@Body() loginDto: LoginDto) {
		const user = await this.usersService.findByDni(loginDto.dni);

		if (!user) {
			throw new UnauthorizedException('Credenciales inválidas (dni)');
		}

		const isPasswordValid = await bcrypt.compare(
			loginDto.password,
			user.password,
		);

		if (!isPasswordValid) {
			throw new BadRequestException('Credenciales inválidas');
		}

		return 'User logged in successfully';
	}
}
