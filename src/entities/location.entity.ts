import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Department } from "./department.entity"
import { Publication } from "./publication.entity"

@Entity({name: 'Location'})
export class Location{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @ManyToOne(() => Department, (department) => department.location)
    @JoinColumn({name: 'department_Id'})
    department: Department

    @OneToMany(() => Publication, (publication) => publication.location)
    publication: Publication[]
}