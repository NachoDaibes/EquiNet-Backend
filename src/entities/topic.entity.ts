import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Discussion } from "./discussion.entity"
import { TopicStatus } from "./topicStatus.entity"

@Entity({name: 'Topic'})
export class Topic{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @Column({name: 'description'})
    description: string

    @OneToMany(() => Discussion, (discussion) => discussion.topic)
    discussion: Discussion[]

    @Column({name: 'image', nullable: true})
    image: string

    @OneToMany(() => TopicStatus, (topicStatus) => topicStatus.topic, {cascade: true})
    topicStatus: TopicStatus[]
}