import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Topic } from "./topic.entity"
import { User } from "./user.entity"
import { DiscussionStatus } from "./discussionStatus.entity"
import { Report } from "./report.entity"
import { Bookmark } from "./bookmark.entity"
import { DiscussionLikes } from "./discussionLikes.entity"
import { Reply } from "./reply.entity"

@Entity({name: 'Discussion'})
export class Discussion{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.discussion)
    @JoinColumn({name: 'user_Id'})
    author: User

    @Column({name: 'title', length: 500})
    title: string

    @Column({name: 'description', length: 2000})
    description: string

    @Column({name: 'image'})
    image: string

    @Column({name: 'likes', nullable: true})
    likes: number = 0

    @ManyToOne(()=> Topic, (topic) => topic.discussion)
    @JoinColumn({name: 'topic_Id'})
    topic: Topic

    @OneToMany(() => DiscussionStatus, (discussionStatus) => discussionStatus.discussion, {cascade: true})
    discussionStatus: DiscussionStatus[]

    @OneToMany(() => Report, (report) => report.discussion)
    report: Report[]

    @OneToMany(() => Bookmark, (bookmark) => bookmark.discussion)
    bookmark: Bookmark[]

    @OneToMany(() => DiscussionLikes, (discussionLikes) => discussionLikes.discussion)
    discussionLikes: DiscussionLikes[]

    @OneToMany(() => Reply, (reply)=> reply.discussion)
    reply: Reply[]
}
