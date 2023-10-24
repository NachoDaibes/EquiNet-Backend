import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTopicDto } from "../createDtos/topic.dto";
import { CreateDisabilityDto } from "../createDtos/disability.dto";

export class UpdateDisabilityDto extends PartialType(CreateDisabilityDto){

    @IsNumber()
    @IsNotEmpty()
    id: number
}