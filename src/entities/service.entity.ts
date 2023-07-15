import { Column, Entity } from "typeorm"
import { Publication } from "./publication.entity"
import { IsObject, IsString } from "class-validator"

@Entity({name: 'service'})
export class Service{

    @Column({name: 'address'})
    @IsString()
    address: string

    @Column({name: 'linkGoogleMaps'})
    @IsString()
    linkGoogleMaps: string

    @Column({name: 'schedule'})
    @IsString()
    schedule: string

    @Column({name: 'publication'})
    @IsObject()
    publication: Publication
}