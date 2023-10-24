import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTopicDto } from "../createDtos/topic.dto";
import { CreateLocationDto } from "../createDtos/location.dto";

export class UpdateLocationDto extends PartialType(CreateLocationDto){

    @IsNumber()
    @IsNotEmpty()
    id: number
}