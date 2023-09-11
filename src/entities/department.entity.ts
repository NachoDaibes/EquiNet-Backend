import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { PoliticalDivision } from "./politicalDivision.entity"
import { Location } from "./location.entity"

@Entity({name: 'Department'})
export class Department{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @ManyToOne(() => PoliticalDivision, (politicalDivision) => politicalDivision.department)
    @JoinColumn({name: 'politicalDivision_Id'})
    politicalDivision: PoliticalDivision

    @OneToMany(() => Location, (location) => location.department)
    location: Location[]
}