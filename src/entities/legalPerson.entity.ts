import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity({name: 'LegalPerson'})
export class LegalPerson{
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'businessName', length: 20})
    businessName: string

    @Column({name: 'phone', length: 13})
    phone: string

    @Column({name: 'contactEmail', length: 256})
    contactEmail: string

    @Column({name: 'idenityNumber', length: 15})
    identityNumber: string

    @Column({name: 'initials', length: 3})
    initials: string

    @Column({name: 'portalUrl', length: 2000})
    portalUrl: string

    @OneToOne(() => User, (user) => user.legalPerson)
    @JoinColumn({name: 'user_Id'})
    user: User
}