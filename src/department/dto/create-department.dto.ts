import { IsNotEmpty, IsObject, IsString, ValidateNested } from "class-validator"
import { AssignDto } from "src/common/assign.dto"

export class CreateDepartmentDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsObject()
    @ValidateNested()
    @IsNotEmpty()
    politicalDivision: AssignDto
}
