import { IsNotEmpty, IsString } from "class-validator"

export class CreateTypeConfigDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    code: string
}
