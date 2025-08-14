import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Controller('facturas')
export class FacturasController {
	constructor(private readonly facturasService: FacturasService) {}

	@Get()
	findAll() {
		return this.facturasService.findAll();
	}

	@Get('/disponibles')
	findAvailable() {
		return this.facturasService.findAvailable();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.facturasService.findOne(id);
	}

	@Get('paginate/:page/:limit')
	paginate(@Param('page') page: number, @Param('limit') limit: number) {
		return this.facturasService.paginate({ page, limit });
	}

	@Get('all')
	findAllDataFactura() {
		return this.facturasService.findAllDataFactura();
	}
	@Get('all/:id')
	findOneDataFactura(@Param('id') id: string) {
		return this.facturasService.findOneDataFactura(id);
	}

	@Post()
	create(@Body() createFacturaDto: CreateFacturaDto) {
		return this.facturasService.create(createFacturaDto);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
		return this.facturasService.update(id, updateFacturaDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.facturasService.remove(id);
	}
}
