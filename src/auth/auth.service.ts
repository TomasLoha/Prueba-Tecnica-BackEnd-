import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async register(@Body() registerDto: RegisterDto) {
		await this.usersService.create(registerDto);
	}

	login(@Body() loginDto: any) {
		return 'User logged in successfully';
	}
}
