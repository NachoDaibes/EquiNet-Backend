import { PartialType } from "@nestjs/swagger";
import { LoginAuthDto } from "./loginAuth.dto";
import { IsNotEmpty } from "class-validator";


export class RegisterAuthDto extends PartialType(LoginAuthDto) {

    @IsNotEmpty()
    username: string

}
