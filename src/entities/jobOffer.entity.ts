import { IsObject, IsString } from "class-validator"
import { Publication } from "./publication.entity"
import { Type } from "./type.entity"
import { Column, Entity } from "typeorm"

@Entity({name: 'job_offer'})
export class JobOffer{

    @Column({name: 'job'})
    @IsString()
    job: string

    @Column({name: 'requeriments'})
    @IsString()
    requeriments: string

    @Column({name: 'offerType'})
    @IsObject()
    offerType: Type

    @Column({name: 'tasks'})
    @IsString()
    tasks: string

    @Column({name: 'publication'})
    @IsObject()
    publication: Publication
}