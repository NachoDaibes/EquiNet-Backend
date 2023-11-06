import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"
import { Discussion } from "src/entities/discussion.entity"

export class ReplyDiscussionDto{

    @IsString()
    @IsNotEmpty()
    content: string

    @IsString()
    image: string

    @IsNumber()
    @IsNotEmpty()
    likes: number

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