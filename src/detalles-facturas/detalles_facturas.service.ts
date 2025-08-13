import { Injectable } from '@nestjs/common';
import { CreateDetallesFacturaDto } from './dto/create-detalles_factura.dto';
import { UpdateDetallesFacturaDto } from './dto/update-detalles_factura.dto';

@Injectable()
export class DetallesFacturasService {
  create(createDetallesFacturaDto: CreateDetallesFacturaDto) {
    return 'This action adds a new detallesFactura';
  }

  findAll() {
    return `This action returns all detallesFacturas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detallesFactura`;
  }

  update(id: number, updateDetallesFacturaDto: UpdateDetallesFacturaDto) {
    return `This action updates a #${id} detallesFactura`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesFactura`;
  }
}
