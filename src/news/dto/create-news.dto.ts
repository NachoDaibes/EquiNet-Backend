import { Type } from "class-transformer"
import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"

export class CreateNewsDto {

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    creator: AssignDto

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    url: string

    @IsString()
    source: string

    @IsNotEmpty()
    @IsString()
    image: string
}
