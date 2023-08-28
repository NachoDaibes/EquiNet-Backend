import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { NewsStatus } from "./newsStatus.entity"

@Entity({name: 'News'})
export class News{
    
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.news)
    @JoinColumn({name: 'user_Id'})
    creator: User

    @Column({name: 'title', length: 20})
    title: string

    @Column({name: 'description', length: 100})
    description: string

    @Column({name: 'url', length: 2000})
    url: string

    @Column({name: 'source', length: 20})
    source: string

    @Column({name: 'createdAt', type: 'datetime'})
    createdAt: Date

    @Column({name: 'image', length: 256})
    image: string

    @OneToMany(() => NewsStatus, (newsStatus) => newsStatus.news)
    newsStatus: NewsStatus

}