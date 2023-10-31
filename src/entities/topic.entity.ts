import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Discussion } from "./discussion.entity"
import { TopicStatus } from "./topicStatus.entity"
import { Image } from "./image.entity"

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

    // @OneToOne(() => Image, (image) => image.topic, {cascade: true, nullable: true})
    // @JoinColumn({name: 'image_Id'})
    // image: Image

    @Column({name: 'image', nullable: true})
    image: string

    @OneToMany(() => TopicStatus, (topicStatus) => topicStatus.topic, {cascade: true})
    topicStatus: TopicStatus[]
}