import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { User } from "./user.entity"
import { Service } from "./service.entity"
import { Donnation } from "./donnation.entity"
import { Job } from "./job.entity"
import { PublicationStatus } from "./publicationStatus.entity"

@Entity({name: 'Publication'})
export class Publication{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'title', length: 200})
    title: string

    @Column({name: 'description'})
    description: string

    @ManyToOne(() => Type, (type) => type.publication)
    @JoinColumn({name: 'publicationType_ Id'})
    publicationType: Type

    @Column({name: 'image'})
    image: string

    // location: string

    @OneToMany(() => PublicationStatus, (publicationStatus) => publicationStatus.publication)
    publicationStatus: PublicationStatus[]

    @ManyToOne(() => User, (user) => user.publication)
    user: User
    
    @OneToOne(() => Service, {cascade: true})
    service: Service
    
    @OneToOne(() => Donnation, {cascade: true})
    donattion: Donnation
    
    @OneToOne(() => Job, {cascade: true})
    job: Job

}