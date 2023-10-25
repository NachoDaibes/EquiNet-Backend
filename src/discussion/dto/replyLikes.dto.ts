import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsObject, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"

export class ReplyLikesDto{

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    user: AssignDto

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    reply: AssignDto
}