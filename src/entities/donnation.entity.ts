import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./type.entity";
import { Publication } from "./publication.entity";

@Entity({name: 'Donnation'})
export class Donnation {
    
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'goal' })
    goal: number

    @Column({name: 'cbu', length: 22})
    cbu: string

    @Column({name: 'deadline'})
    deadline: Date

    @OneToOne(() => Publication, (publication) => publication.donnation)
    @JoinColumn({name: 'publication_Id'})
    publication: Publication
}