import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAll() {
		return this.usersService.findAll();
	}

	@Get('/disponibles')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAvailable() {
		return this.usersService.findAvailable();
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(id);
	}

	@Get('paginate/:page/:limit')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	paginate(@Param('page') page: number, @Param('limit') limit: number) {
		return this.usersService.paginate({ page, limit });
	}

	@Post()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}

	@Delete('hardDelete/:id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	hardDelete(@Param('id') id: string) {
		return this.usersService.hardDelete(id);
	}
}
