import { Type } from "class-transformer"
import { IsObject, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"
import { Discussion } from "src/entities/discussion.entity"

export class UpdateReplyDto{
    @IsString()
    content: string

    @IsString()
    image: string

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    discussion: Discussion
}