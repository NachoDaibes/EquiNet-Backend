import { IsString } from "class-validator"
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity({name: 'Enterprise'})
export class Enterprise{
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'businessName', length: 20})
    businessName: string

    @Column({name: 'phone', length: 13})
    phone: string

    @Column({name: 'contactEmail', length: 256})
    contactEmail: string

    @OneToOne(() => User)
    @JoinColumn({name: 'user'})
    user: User
}