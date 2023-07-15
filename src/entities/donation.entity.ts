import { IsDateString, IsNumber, IsString } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity({name: 'donation'})
export class Donation {

    @Column({name: 'goal'})
    @IsNumber()
    goal: number

    @Column({name: 'cbu'})
    @IsString()
    cbu: string

    @Column({name: 'deadline'})
    @IsDateString()
    deadline: Date
}