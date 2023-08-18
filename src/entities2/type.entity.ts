import { IsNumber, IsString } from "class-validator"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TypeConfig } from "./typeConfig.entity"

@Entity({name: 'Type'})
export class Type{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 20})
    name: string

    @Column({name: 'code', length: 20})
    code: string

    @Column({name: 'order'})
    order: number

    @Column({name: 'filter', length: 20})
    filter: string

    @ManyToOne(() => TypeConfig, (typeConfig) => typeConfig.type)
    @JoinColumn({name: 'typeConfig_Id'})
    typeConfig: TypeConfig
}