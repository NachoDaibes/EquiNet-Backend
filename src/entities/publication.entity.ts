import { IsObject, IsString } from "class-validator"
import { Type } from "./type.entity"
import { Column, Entity } from "typeorm"

@Entity({name: 'publication'})
export class Publication{

    @Column({name: 'title'})
    @IsString()
    title: string

    @Column({name: 'description'})
    @IsString()
    description: string

    @Column({name: 'publicationType'})
    @IsObject()
    publicationType: Type

    image: string

    location: string

}