import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from 'src/entities/publication.entity';
import { PublicationStatus } from 'src/entities/publicationStatus.entity';
import { Type } from 'src/entities/type.entity';
import { TypeService } from 'src/type/type.service';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publication, PublicationStatus, Type, User])],
  controllers: [ReportsController],
  providers: [ReportsService, TypeService],
})
export class ReportsModule {}
