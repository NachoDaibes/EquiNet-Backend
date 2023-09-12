import { Module } from '@nestjs/common';
import { DisabilityService } from './disability.service';
import { DisabilityController } from './disability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'src/entities/type.entity';
import { Disability } from 'src/entities/disability.entity';
import { TypeService } from 'src/type/type.service';

@Module({
  imports: [TypeOrmModule.forFeature([Disability, Type])],
  controllers: [DisabilityController],
  providers: [DisabilityService, TypeService],
})
export class DisabilityModule {}
