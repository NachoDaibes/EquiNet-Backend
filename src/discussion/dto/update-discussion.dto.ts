import { PartialType } from '@nestjs/swagger';
import { CreateDiscussionDto } from './create-discussion.dto';
import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AssignDto } from 'src/common/assign.dto';

export class UpdateDiscussionDto {

    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    image: string

    @IsObject()
    @ValidateNested()
    @Type(() => AssignDto)
    topic: AssignDto
}
