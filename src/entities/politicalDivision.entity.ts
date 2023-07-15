import { IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import { Department } from "./department.entity";

@Entity({name: 'political_division'})
export class PoliticalDivision {

    @Column({name: 'name'})
    @IsString()
    name: string

    department: Department[]
}