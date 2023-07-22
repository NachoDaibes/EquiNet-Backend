import { IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department.entity";

@Entity({name: 'PoliticalDivision'})
export class PoliticalDivision {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 50})
    name: string

    @OneToMany(() => Department, (department) => department.politicalDivision)
    department: Department[]
}