import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { NewsStatus } from "./newsStatus.entity"

@Entity({name: 'News'})
export class News{
    
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.news)
    @JoinColumn({name: 'user_Id'})
    creator: User

    @Column({name: 'title', length: 150})
    title: string

    @Column({name: 'description', length: 3000})
    description: string

    @Column({name: 'url', length: 2000})
    url: string

    @Column({name: 'source', length: 80})
    source: string

    @Column({name: 'image', length: 1000})
    image: string

    @OneToMany(() => NewsStatus, (newsStatus) => newsStatus.news, {cascade: true})
    newsStatus: NewsStatus[]

}