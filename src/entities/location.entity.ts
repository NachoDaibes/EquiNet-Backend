import { IsObject, IsString } from "class-validator"
import { Department } from "./department.entity"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"

@Entity({name: 'location'})
export class Location{

    @Column({name: 'name'})
    @IsString()
    name: string

    @ManyToOne(() => Department, (department) => department)
    @JoinColumn({name: 'Department'})
    department: Department
}