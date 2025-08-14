import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() registerDto: RegisterDto) {
		return this.authService.register(registerDto);
	}

	@Post('login')
	login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}

	@Get('test')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	getProfile(@Request() req) {
		return req.user;
	}
}
