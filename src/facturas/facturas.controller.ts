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
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('facturas')
export class FacturasController {
	constructor(private readonly facturasService: FacturasService) {}

	@Get()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAll() {
		return this.facturasService.findAll();
	}

	@Get('/disponibles')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAvailable() {
		return this.facturasService.findAvailable();
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findOne(@Param('id') id: string) {
		return this.facturasService.findOne(id);
	}

	@Get('paginate/:page/:limit')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	paginate(@Param('page') page: number, @Param('limit') limit: number) {
		return this.facturasService.paginate({ page, limit });
	}

	@Get('all')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAllDataFactura() {
		return this.facturasService.findAllDataFactura();
	}
	@Get('all/:id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findOneDataFactura(@Param('id') id: string) {
		return this.facturasService.findOneDataFactura(id);
	}

	@Post()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	create(@Body() createFacturaDto: CreateFacturaDto) {
		return this.facturasService.create(createFacturaDto);
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	update(@Param('id') id: string, @Body() updateFacturaDto: UpdateFacturaDto) {
		return this.facturasService.update(id, updateFacturaDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	remove(@Param('id') id: string) {
		return this.facturasService.remove(id);
	}
}
