import { IsOptional, IsString } from "class-validator"

export class LegalPersonDto{

    @IsString()
    @IsOptional()
    businessName: string

    @IsString()
    @IsOptional()
    phone: string

    @IsString()
    @IsOptional()
    contactEmail: string

    @IsString()
    @IsOptional()
    identityNumber: string

    @IsString()
    @IsOptional()
    initials: string

    @IsString()
    @IsOptional()
    portalUrl: string
}