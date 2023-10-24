import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTopicDto } from "../createDtos/topic.dto";
import { CreatePoliticalDivisionDto } from "../createDtos/politicalDivision.dto";

export class UpdatePoliticalDivisionDto extends PartialType(CreatePoliticalDivisionDto){

    @IsNumber()
    @IsNotEmpty()
    id: number
}