import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Discussion } from "./discussion.entity";
import { Type } from "./type.entity";

@Entity({name: 'DiscussionStatus'})
export class DiscussionStatus{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.discussionStatus)
    @JoinColumn({name: 'discussionStatusType_Id'})
    discussionStatusType: Type

    @ManyToOne(() => Type, (type) => type.discussionStatusReason)
    @JoinColumn({name: 'discussionStatusReasonType_Id'})
    discussionStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => Discussion, (discussion) => discussion.discussionStatus)
    @JoinColumn({name: 'discussion_Id'})
    discussion: Discussion

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
    
}