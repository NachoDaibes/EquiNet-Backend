import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { ImageDto } from "./image.dto";
import { AssignDto } from "src/common/assign.dto";

export class CreateDiscussionDto {

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    author: AssignDto

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    likes: number

    // @IsArray()
    // @ValidateNested({ each: true })
    // @Type(() => ImageDto)
    // @IsNotEmpty()
    // images: ImageDto[];

    @IsString()
    image: string

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    @IsNotEmpty()
    topic: AssignDto
}
