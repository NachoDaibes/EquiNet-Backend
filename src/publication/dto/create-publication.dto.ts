import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"
import { Donnation } from "src/entities/donnation.entity"
import { Job } from "src/entities/job.entity"
import { PublicationServiceDto } from "./publicationService.dto"
import { PublicationJobDto } from "./publicationJob.dto"
import { PublicationDonnattionDto } from "./publicationDonnattion.dto"

export class CreatePublicationDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    description: string

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    publicationType: AssignDto

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
    @Type(() => PublicationDonnattionDto)
    donnattion: PublicationDonnattionDto
}
