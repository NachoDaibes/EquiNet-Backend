import { IsNotEmpty, IsString, Length } from "class-validator";

export class AssignTypeDto{
    @IsString()
    @Length(0, 80)
    @IsNotEmpty()
    code: string
}