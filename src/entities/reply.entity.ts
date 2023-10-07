import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Discussion } from "./discussion.entity"
import { ReplyStatus } from "./replyStatus.entity"
import { Report } from "./report.entity"
import { User } from "./user.entity"
import { ReplyLikes } from "./replyLikes.entity"

@Entity({name: 'Reply'})
export class Reply {
   
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'content'})
    content: string

    @Column({name: 'image'})
    image: string

    @ManyToOne(() => Discussion, (discussion) => discussion.reply)
    @JoinColumn({name: 'discussion_Id'})
    discussion: Discussion

    @ManyToOne(() => User, (user) => user.reply)
    @JoinColumn({name: 'user_Id'})
    author: User

    @OneToMany(() => ReplyStatus, (replyStatus) => replyStatus. reply, {cascade: true})
    replyStatus: ReplyStatus[]

    @OneToMany(() => Report, (report) => report.reply)
    report: Report[]
    
    @OneToMany(() => ReplyLikes, (replyLikes) => replyLikes.reply)
    replyLikes: ReplyLikes[]
}