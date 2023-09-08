import { IsString } from "class-validator"

export class PublicationServiceDto{

    @IsString()
    address: string

    @IsString()
    linkGoogleMaps: string

    @IsString()
    schedule: string
}