import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { DetallesFacturasService } from './detalles_facturas.service';
import { CreateDetallesFacturaDto } from './dto/create-detalles_factura.dto';
import { UpdateDetallesFacturaDto } from './dto/update-detalles_factura.dto';

@Controller('detalles-facturas')
export class DetallesFacturasController {
	constructor(
		private readonly detallesFacturasService: DetallesFacturasService,
	) {}

	@Get()
	findAll() {
		return this.detallesFacturasService.findAll();
	}

	@Get('/disponibles')
	findAvailable() {
		return this.detallesFacturasService.findAvailable();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.detallesFacturasService.findOne(id);
	}

	@Get('paginate/:page/:limit')
	paginate(@Param('page') page: number, @Param('limit') limit: number) {
		return this.detallesFacturasService.paginate({ page, limit });
	}

	@Post()
	create(@Body() createDetallesFacturaDto: CreateDetallesFacturaDto) {
		return this.detallesFacturasService.create(createDetallesFacturaDto);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateDetallesFacturaDto: UpdateDetallesFacturaDto,
	) {
		return this.detallesFacturasService.update(id, updateDetallesFacturaDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.detallesFacturasService.remove(id);
	}
}
