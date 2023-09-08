import { PartialType } from "@nestjs/swagger";
import { LoginAuthDto } from "./loginAuth.dto";
import { IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { LegalPersonDto } from "./legalPerson.dto";
import { IndividualPersonDto } from "./individualPerson.dto";
import { Type } from "class-transformer";


export class RegisterAuthDto extends PartialType(LoginAuthDto) {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsString()
    @IsOptional()
    image: string

    @IsNotEmpty()
    @IsString()
    profileType: string

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IndividualPersonDto)
    individualPerson: IndividualPersonDto

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => LegalPersonDto)
    legalPerson: LegalPersonDto
}
