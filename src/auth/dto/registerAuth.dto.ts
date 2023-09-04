import { PartialType } from "@nestjs/swagger";
import { LoginAuthDto } from "./loginAuth.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class RegisterAuthDto extends PartialType(LoginAuthDto) {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsString()
    @IsOptional()
    image: string
}
