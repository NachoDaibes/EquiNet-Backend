import { Module } from '@nestjs/common';
import { MercadoPagoController } from './mercadoPago.controller';
import { MercadoPagoService } from './mercadoPago.service';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService, User],
})
export class MercadoPagoModule {}
