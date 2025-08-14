import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register() {
		return 'Registro seccion de autenticacion';
	}

	@Post('login')
	login() {
		return 'Login seccion de autenticacion';
	}
}
