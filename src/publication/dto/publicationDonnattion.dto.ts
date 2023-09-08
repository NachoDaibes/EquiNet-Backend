import { IsDateString, IsNumber, IsString } from "class-validator"

export class PublicationDonnattionDto{

    @IsNumber()
    goal: number

    @IsString()
    cbu: string

    @IsDateString()
    deadline: Date
}