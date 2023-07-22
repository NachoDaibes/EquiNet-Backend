import { IsObject, IsString } from "class-validator"
import { Column, Entity, OneToMany } from "typeorm"
import { PublicationDisability } from "./publicationDisability.entity"
import { Type } from "./type.entity"
import { PublicationCategory } from "./publicationCategory.entity"

@Entity({name: 'Publication'})
export class Publication{

    @Column({name: 'title'})
    title: string

    @Column({name: 'description'})
    description: string

    @Column({name: 'publicationType'})
    publicationType: Type

    image: string

    location: string

    @OneToMany(() => PublicationDisability, (publicationDisability) => publicationDisability.publication)
    publicationDisability: PublicationDisability[]

    @OneToMany(() => PublicationCategory, (publicationCategory) => publicationCategory.publication)
    publicationCategory: PublicationCategory[]
}