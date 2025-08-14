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
import { DetallesFacturasService } from './detalles_facturas.service';
import { CreateDetallesFacturaDto } from './dto/create-detalles_factura.dto';
import { UpdateDetallesFacturaDto } from './dto/update-detalles_factura.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('detalles-facturas')
export class DetallesFacturasController {
	constructor(
		private readonly detallesFacturasService: DetallesFacturasService,
	) {}

	@Get()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAll() {
		return this.detallesFacturasService.findAll();
	}

	@Get('/disponibles')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findAvailable() {
		return this.detallesFacturasService.findAvailable();
	}

	@Get(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	findOne(@Param('id') id: string) {
		return this.detallesFacturasService.findOne(id);
	}

	@Get('paginate/:page/:limit')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	paginate(@Param('page') page: number, @Param('limit') limit: number) {
		return this.detallesFacturasService.paginate({ page, limit });
	}

	@Post()
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	create(@Body() createDetallesFacturaDto: CreateDetallesFacturaDto) {
		return this.detallesFacturasService.create(createDetallesFacturaDto);
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	update(
		@Param('id') id: string,
		@Body() updateDetallesFacturaDto: UpdateDetallesFacturaDto,
	) {
		return this.detallesFacturasService.update(id, updateDetallesFacturaDto);
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	@ApiBearerAuth('AuthGuard')
	remove(@Param('id') id: string) {
		return this.detallesFacturasService.remove(id);
	}
}
