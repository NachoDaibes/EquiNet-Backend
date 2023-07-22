import { IsObject, IsString } from "class-validator"
import { PoliticalDivision } from "./politicalDivision.entity"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'Department'})
export class Department{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 50})
    name: string

    @ManyToOne(() => PoliticalDivision, (politicalDivision) => politicalDivision.department)
    @JoinColumn({name: 'politicalDivision_Id'})
    politicalDivision: PoliticalDivision

    @OneToMany(() => Location, (location) => location)//está mal pero no sé por qué no me recomienda el atributo
    location: Location[]
}