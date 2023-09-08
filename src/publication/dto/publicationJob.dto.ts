import { Type } from "class-transformer"
import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"

export class PublicationJobDto{

    @IsString()
    job: string

    @IsString()
    requeriments: string

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)    
    offerType: AssignDto

    @IsString()
    tasks: string
}