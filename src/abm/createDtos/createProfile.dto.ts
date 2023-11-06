import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProfileDto{

    @IsString()
    @IsNotEmpty()
    name: string

    profileAccess: ProfileAccessDto[]
}

export class ProfileAccessDto{
    access: AccessDto
}

export class AccessDto{

    @IsNumber()
    @IsNotEmpty()
    id: number
}