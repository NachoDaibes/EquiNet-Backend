import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"
import { Donnation } from "src/entities/donnation.entity"
import { Job } from "src/entities/job.entity"
import { PublicationServiceDto } from "./publicationService.dto"
import { PublicationJobDto } from "./publicationJob.dto"
import { PublicationDonnationDto } from "./publicationDonnattion.dto"
import { AssignTypeDto } from "src/common/assign-type.helper"

export class CreatePublicationDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    description: string

    @IsObject()
    @ValidateNested()
    @Type(() => AssignTypeDto)
    @IsNotEmpty()
    publicationType: AssignTypeDto

    @IsString()
    @IsOptional()
    image: string

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    user: AssignDto

    @IsOptional()
    @IsObject()
    @Type(() => PublicationServiceDto)
    service: PublicationServiceDto

    @IsOptional()
    @IsObject()
    @Type(() => PublicationJobDto)    
    job: PublicationJobDto

    @IsOptional()
    @IsObject()
    @Type(() => PublicationDonnationDto)
    donnation: PublicationDonnationDto
}