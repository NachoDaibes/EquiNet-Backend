import { IsNotEmpty, IsString } from "class-validator"

export class CreateTypeConfigDto {
    @IsString()
    @IsNotEmpty()
    code: string
}
