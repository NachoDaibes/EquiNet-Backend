import { Publication } from "./publication.entity"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"

@Entity({name: 'JobOffer'})
export class JobOffer{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'job', length: 20})
    job: string

    @Column({name: 'requeriments', length: 100})
    requeriments: string

    @OneToOne(() => Type)
    @JoinColumn({name: 'offerType_Id'})
    offerType: Type

    @Column({name: 'tasks', length: 100})
    tasks: string

    @OneToOne(()=> Publication)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication
}