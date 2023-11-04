import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateAccessDto{

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    code: string

    @IsNotEmpty()
    @IsNumber()
    order: number
}