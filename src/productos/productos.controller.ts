import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
	constructor(private productosService: ProductosService) {}

	@Post()
	create(@Body() createProductoDto: CreateProductoDto) {
		return this.productosService.create(createProductoDto);
	}

	@Get()
	findAll() {
		return this.productosService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.productosService.findOne(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updateProductoDto: UpdateProductoDto,
	) {
		return this.productosService.update(+id, updateProductoDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.productosService.remove(+id);
	}
}
