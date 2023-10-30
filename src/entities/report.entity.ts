import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Discussion } from "./discussion.entity"
import { Reply } from "./reply.entity"
import { Type } from "./type.entity"
import { User } from "./user.entity"

@Entity({name: 'Report'})
export class Report{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'description'})
    description: string

    @Column({name: 'reportedAt'})
    reportedAt: Date

    @ManyToOne(() => User, (user) => user.report)
    @JoinColumn({name: 'user_Id'})
    user: User

    @ManyToOne(() => Reply, (reply) => reply.report, {nullable: true})
    @JoinColumn({name: 'reply_Id'})
    reply: Reply

    @ManyToOne(() => Discussion, (discussion) => discussion.report, {nullable: true})
    @JoinColumn({name: 'discussion_Id'})
    discussion: Discussion

    @ManyToOne(() => Type, (type) => type.reportReason)
    @JoinColumn({name: 'reasonType_Id'})
    reason: Type
}