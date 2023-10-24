import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateTopicDto } from "../createDtos/topic.dto";
import { CreateDepartmentDto } from "../createDtos/department.dto";

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto){

    @IsNumber()
    @IsNotEmpty()
    id: number
}