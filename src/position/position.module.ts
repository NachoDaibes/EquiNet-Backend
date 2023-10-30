import { Module } from '@nestjs/common';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from 'src/entities/position.entity';
import { TypeService } from 'src/type/type.service';
import { Type } from 'src/entities/type.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Position, Type])],
  controllers: [PositionController],
  providers: [PositionService, TypeService, EmailService],
})
export class PositionModule {}
