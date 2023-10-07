import { Type } from "class-transformer"
import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"
import { Discussion } from "src/entities/discussion.entity"

export class ReplyDiscussionDto{

    @IsString()
    @IsNotEmpty()
    content: string

    @IsString()
    image: string

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    discussion: Discussion

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    author: AssignDto

}