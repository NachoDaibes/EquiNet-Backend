import { IsObject, IsString } from "class-validator"
import { PoliticalDivision } from "./politicalDivision.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm"

@Entity({name: 'Department'})
export class Department{

    @Column({name: 'name'})
    @IsString()
    name: string

    @ManyToOne(() => PoliticalDivision, (politicalDivision) => politicalDivision.department)
    @JoinColumn({name: 'Political_Division_Id'})
    politicalDivision: PoliticalDivision

    location: Location
}