import { IsString } from "class-validator"
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"

@Entity({name: 'TypeConfig'})
export class TypeConfig{
    @PrimaryColumn({name: 'code', length: 80})
    code: string

    @Column({name: 'name', length: 80})
    name: string

    @OneToMany(() => Type, (type) => type.typeConfig)
    type: Type[]
}