import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginAuthDto{

    @IsEmail()
    @IsNotEmpty()
    email: string

    @MinLength(4)
    @MaxLength(12)
    @IsNotEmpty()
    @IsString()
    password: string
}
