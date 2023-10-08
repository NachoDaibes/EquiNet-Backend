import { PartialType } from '@nestjs/swagger';
import { CreatePublicationDto } from './create-publication.dto';
import { PublicationStatusDto } from './publication-status.dto';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { AssignTypeDto } from 'src/common/assign-type.helper';
import { AssignDto } from 'src/common/assign.dto';
import { ImageDto } from './image.dto';
import { PublicationDonnationDto } from './publicationDonnattion.dto';
import { PublicationJobDto } from './publicationJob.dto';
import { PublicationServiceDto } from './publicationService.dto';

export class CreatePublicationByAdminDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AssignTypeDto)
  @IsNotEmpty()
  publicationType: AssignTypeDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  @IsNotEmpty()
  images: ImageDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => AssignDto)
  @IsNotEmpty()
  user: AssignDto;

  @IsOptional()
  @IsObject()
  @Type(() => PublicationServiceDto)
  service: PublicationServiceDto;

  @IsOptional()
  @IsObject()
  @Type(() => PublicationJobDto)
  job: PublicationJobDto;

  @IsOptional()
  @IsObject()
  @Type(() => PublicationDonnationDto)
  donation: PublicationDonnationDto;
  
  @Type(() => PublicationStatusDto)
  publicationStatus: PublicationStatusDto[];
}
