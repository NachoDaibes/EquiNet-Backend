import { IsObject, IsString } from "class-validator"
import { Department } from "./department.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'Location'})
export class Location{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 50})
    name: string

    @ManyToOne(() => Department, (department) => department.location)
    @JoinColumn({name: 'department_Id'})
    department: Department
}