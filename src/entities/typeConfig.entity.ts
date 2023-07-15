import { IsNumber, IsString } from "class-validator"
import { Column } from "typeorm"

export class TypeConfig{

    @Column({name: 'name'})
    @IsString()
    name: string

    @Column({name: 'code'})
    @IsString()
    code: string

    @Column({name: 'order'})
    @IsNumber()
    order: number

    @Column({name: 'filter'})
    @IsString()
    filter: string
}