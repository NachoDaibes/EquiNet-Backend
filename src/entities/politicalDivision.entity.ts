import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Department } from "./department.entity"

@Entity({name: 'PoliticalDivision'})
export class PoliticalDivision{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @OneToMany(() => Department, (department) => department.politicalDivision)
    department: Department[]
}