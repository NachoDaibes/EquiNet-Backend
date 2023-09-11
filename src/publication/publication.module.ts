import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from 'src/entities/publication.entity';
import { PublicationStatus } from 'src/entities/publicationStatus.entity';
import { TypeService } from 'src/type/type.service';
import { Type } from 'src/entities/type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publication, PublicationStatus, Type])
  ],
  controllers: [PublicationController],
  providers: [PublicationService, TypeService]
})
export class PublicationModule {}
 