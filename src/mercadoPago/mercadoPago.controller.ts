// payment.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MercadoPagoService } from './mercadoPago.service';
import { MercadoPagoDto } from './dto/mercadoPago.dto';

@Controller('mercadoPago')
export class MercadoPagoController {
  constructor(private readonly mercadoPagoService: MercadoPagoService) {}

  @Post('procesarPago')
  async procesarPago(@Body() mercadoPagoDto: MercadoPagoDto): Promise<string> {
    const initPoint = await this.mercadoPagoService.procesarPago(mercadoPagoDto);
    return initPoint;
  }
}
