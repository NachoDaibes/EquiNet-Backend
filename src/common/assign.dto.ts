import { IsNotEmpty, IsNumber } from "class-validator";

export class AssignDto{

    @IsNumber({maxDecimalPlaces: 0})
    @IsNotEmpty()
    id: number
}