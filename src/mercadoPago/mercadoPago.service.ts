// payment.service.ts
import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { MercadoPagoDto } from './dto/mercadoPago.dto';

@Injectable()
export class MercadoPagoService {
  private client: any;

  constructor() {
    this.client = new mercadopago.MercadoPagoConfig({
      accessToken:
        'TEST-915040643118270-121022-ac5d8c626ed5506c44d5d8ce27f1d491-1588049654',
      // 'TEST-5081312423112269-120519-cee07a3818fbf8f81bcf868a49a89c71-244207206',
      // accessToken: 'APP_USR-5081312423112269-120519-6b5f1a90b287661eea9e2900424f594a-244207206',
      options: { timeout: 5000 },
    });
  }

  async procesarPago(mercadoPagoDto: MercadoPagoDto): Promise<string> {
    const preference = new mercadopago.Preference(this.client);

    const items = [
      {
        id: '<ID>',
        title: '<title>',
        quantity: 1,
        unit_price: mercadoPagoDto.monto,
      },
    ];

    try {
      const response: any = await preference.create({
        body: {
          items,
          back_urls: {
            success: 'http://localhost:4200/home',
            failure: 'http://localhost:4200/home',
            pending: 'http://localhost:4200/home',
          },
          auto_return: 'approved',
        },
      });

      return { res: response.id } as any;
    } catch (error) {
      console.error(error);
      console.log(error);
      throw new Error('Error al procesar el pago');
    }
  }
}
