import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Reply } from "./reply.entity"
import { User } from "./user.entity"

@Entity({name: 'ReplyLikes'})
export class ReplyLikes{
    
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.replyLikes)
    @JoinColumn({name: 'user_Id'})
    user: User

    @ManyToOne(() => Reply, (reply) => reply.replyLikes)
    @JoinColumn({name: 'reply_Id'})
    reply: Reply
}