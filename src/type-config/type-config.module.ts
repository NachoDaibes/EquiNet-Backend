import { Module } from '@nestjs/common';
import { TypeConfigService } from './type-config.service';
import { TypeConfigController } from './type-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeConfig } from 'src/entities/typeConfig.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeConfig])    
  ],
  controllers: [TypeConfigController],
  providers: [TypeConfigService]
})
export class TypeConfigModule {}
