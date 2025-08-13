import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesFacturasService } from './detalles_facturas.service';
import { CreateDetallesFacturaDto } from './dto/create-detalles_factura.dto';
import { UpdateDetallesFacturaDto } from './dto/update-detalles_factura.dto';

@Controller('detalles-facturas')
export class DetallesFacturasController {
  constructor(private readonly detallesFacturasService: DetallesFacturasService) {}

  @Post()
  create(@Body() createDetallesFacturaDto: CreateDetallesFacturaDto) {
    return this.detallesFacturasService.create(createDetallesFacturaDto);
  }

  @Get()
  findAll() {
    return this.detallesFacturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesFacturasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallesFacturaDto: UpdateDetallesFacturaDto) {
    return this.detallesFacturasService.update(+id, updateDetallesFacturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesFacturasService.remove(+id);
  }
}
