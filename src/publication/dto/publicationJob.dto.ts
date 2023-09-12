import { Type } from "class-transformer"
import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator"
import { AssignTypeDto } from "src/common/assign-type.helper"
import { AssignDto } from "src/common/assign.dto"

export class PublicationJobDto{
    @IsString()
    job: string

    @IsString()
    requeriments: string

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => AssignTypeDto)    
    offerType: AssignTypeDto

    @IsString()
    tasks: string
}