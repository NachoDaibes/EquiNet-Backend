import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTopicDto } from "../createDtos/topic.dto";

export class UpdateTopicDto extends PartialType(CreateTopicDto){

    @IsNumber()
    @IsNotEmpty()
    id: number
}