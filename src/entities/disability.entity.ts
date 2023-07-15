import { IsString } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity({name: 'disability'})
export class Disability{

    @Column({name: 'name'})
    @IsString()
    name: string
}