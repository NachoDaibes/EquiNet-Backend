import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateDisabilityDto{

    @IsString()
    @IsNotEmpty()
    name: string
}