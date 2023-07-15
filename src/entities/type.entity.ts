import { IsString } from "class-validator"
import { Column } from "typeorm"

export class Type{
    
    @Column({name: 'name'})
    @IsString()
    name: string

    @Column({name: 'code'})
    @IsString()
    code: string
}