import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Discussion } from "./discussion.entity";
import { User } from "./user.entity";

Entity({name: 'Bookmark'})
export class Bookmark {

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.bookmark)
    @JoinColumn({name: 'user_Id'})
    user: User
    
    @ManyToOne(() => Discussion, (discussion) => discussion.bookmark)
    @JoinColumn({name: 'discussion_Id'})
    discussion: Discussion
}