import { IsString } from "class-validator"
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { Type } from "src/entities/type.entity"

@Entity({name: 'IndividualPerson'})
export class IndividualPerson{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'firstName', length: 20})
    firstName: string

    @Column({name: 'lastName', length: 20})
    lastName: string

    @Column({name: 'phone', length: 13})
    phone: string

    @Column({name: 'contactEmail', length: 256})
    contactEmail: string

    @OneToOne(() => Type)
    identityType: Type

    @Column({name: 'identityNumber', length: 15})
    identityNumber: string

    @Column({name: 'birthday'})
    birthday: Date

    @Column({name: 'cv', length: 50})
    cv: string

    @ManyToOne(() => User, (user) => user.individualPerson)
    @JoinColumn({name: 'user_Id'})
    user: User
}