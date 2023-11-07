import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ChangePasswordDto{

    @IsNumber()
    @IsNotEmpty()
    userId: number

    @IsString()
    @IsNotEmpty()
    currentPassword: string

    @IsString()
    @IsNotEmpty()
    password: string
}