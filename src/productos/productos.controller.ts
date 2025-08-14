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
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('productos')
export class ProductosController {
	constructor(private readonly productosService: ProductosService) {}

	@Get()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAll() {
		return this.productosService.findAll();
	}

	@Get('/disponibles')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAvailable() {
		return this.productosService.findAvailable();
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findOne(@Param('id') id: string) {
		return this.productosService.findOne(id);
	}

	@Get('paginate/:page/:limit')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	paginate(@Param('page') page: number, @Param('limit') limit: number) {
		return this.productosService.paginate({ page, limit });
	}

	@Post()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	create(@Body() createProductoDto: CreateProductoDto) {
		return this.productosService.create(createProductoDto);
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	update(
		@Param('id') id: string,
		@Body() updateProductoDto: UpdateProductoDto,
	) {
		return this.productosService.update(id, updateProductoDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	remove(@Param('id') id: string) {
		return this.productosService.remove(id);
	}
}
