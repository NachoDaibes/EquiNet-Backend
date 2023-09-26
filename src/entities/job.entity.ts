import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./type.entity";
import { Publication } from "./publication.entity";

@Entity({name: 'Job'})
export class Job {
    
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'job', length: 20})
    job: string

    @Column({name: 'requeriments', length: 500})
    requeriments: string

    @ManyToOne(() => Type, (type) => type.job)
    @JoinColumn({name: 'offerType_Id'})
    offerType: Type

    @Column({name: 'tasks', length: 500})
    tasks: string

    @OneToOne(() => Publication, (publication) => publication.job)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication
}