import { IsNotEmpty, IsString } from "class-validator";

export class CreatePoliticalDivisionDto {

    @IsString()
    @IsNotEmpty()
    name: string
}
