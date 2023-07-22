import { IsString } from "class-validator"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity({name: 'Person'})
export class Person{

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

    @OneToOne(() => User)
    @JoinColumn({name: 'user'})
    user: User
}