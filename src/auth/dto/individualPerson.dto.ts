import { Type } from "class-transformer"
import { IsDateString, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"

export class IndividualPersonDto{

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
    @Type(() => AssignDto)
    @IsNotEmpty()
    identityType: AssignDto

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