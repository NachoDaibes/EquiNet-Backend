import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'News'})
export class News {

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @OneToOne(()=> User)
    @JoinColumn({name: 'user_Id'})
    creator: User

    @Column({name: 'title', length: 256})
    title: string

    @Column({name: 'description'})
    description: string

    @Column({name: 'url', length: 127})
    url: string

    @Column({name: 'isActive'})
    isActive: boolean
}