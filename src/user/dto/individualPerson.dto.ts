import { Type } from "class-transformer"
import { IsDateString, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { AssignTypeDto } from "src/common/assign-type.helper"
import { AssignDto } from "src/common/assign.dto"

export class IndividualPersonDto{

    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsOptional()
    firstName: string

    @IsString()
    @IsOptional()
    lastName: string

    @IsString()
    @IsOptional()
    phone: string

    @IsString()
    @IsOptional()
    contactEmail: string

    @IsObject()
    @ValidateNested()
    @Type(() => AssignTypeDto)
    @IsNotEmpty()
    identityType: AssignTypeDto

    @IsString()
    @IsOptional()
    identityNumber: string

    @IsDateString()
    @IsOptional()
    birthday: Date

    @IsString()
    @IsOptional()
    cv: string
}