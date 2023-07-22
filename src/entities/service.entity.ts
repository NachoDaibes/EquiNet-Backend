import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Publication } from "./publication.entity"

@Entity({name: 'Service'})
export class Service{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'address', length: 50})
    address: string

    @Column({name: 'linkGoogleMaps', length: 256})
    linkGoogleMaps: string

    @Column({name: 'schedule', length: 50})
    schedule: string

    @OneToOne(() => Publication)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication
}