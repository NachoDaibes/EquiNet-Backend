import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Discussion } from "./discussion.entity"
import { User } from "./user.entity"

Entity({name: 'DiscussionLikes'})
export class DiscussionLikes{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.discussionLikes)
    @JoinColumn({name: 'user_Id'})
    user: User

    @ManyToOne(() => Discussion, (discussion) => discussion.discussionLikes)
    @JoinColumn({name: 'discussion_Id'})
    discussion: Discussion
}