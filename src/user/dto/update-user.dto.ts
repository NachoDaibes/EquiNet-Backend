import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IndividualPersonDto } from 'src/auth/dto/individualPerson.dto';
import { LegalPersonDto } from 'src/auth/dto/legalPerson.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsOptional()
    username: string

    @IsString()
    @IsOptional()
    image: string

    @IsOptional()
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
