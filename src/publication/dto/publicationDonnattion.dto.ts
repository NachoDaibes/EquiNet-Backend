import { IsDateString, IsNumber, IsString } from "class-validator"

export class PublicationDonnationDto{

    @IsNumber()
    goal: number

    @IsString()
    cbu: string

    @IsDateString()
    deadline: Date
}