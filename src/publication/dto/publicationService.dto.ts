import { IsNotEmpty, IsString } from "class-validator"

export class PublicationServiceDto{

    @IsString()
    address: string

    @IsString()
    @IsNotEmpty()
    linkGoogleMaps: string

    @IsString()
    schedule: string
}