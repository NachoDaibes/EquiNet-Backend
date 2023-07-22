import { IsString } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"

@Entity({name: 'TypeConfig'})
export class TypeConfig{
    
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 20})
    name: string

    @Column({name: 'code', length: 20})
    code: string

    @OneToMany(() => Type, (type) => type.typeConfig)
    type: Type[]
}