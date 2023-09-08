import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Publication } from "./publication.entity"

@Entity({name: 'Service'})
export class Service {
    
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'address'})
    address: string

    @Column({name: 'linkGoogleMaps'})
    linkGoogleMaps: string

    @Column({name: 'schedule'})
    schedule: string

    @OneToOne(() => Publication)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication
}