import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reply } from "./reply.entity";
import { Type } from "./type.entity";

Entity({name: 'ReplyStatus'})
export class ReplyStatus{
    
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.replyStatus)
    @JoinColumn({name: 'replyStatusType_Id'})
    replyStatusType: Type

    @ManyToOne(() => Type, (type) => type.replyStatusReason)
    @JoinColumn({name: 'replyStatusReasonType_Id'})
    replyStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => Reply, (reply) => reply.replyStatus)
    @JoinColumn({name: 'reply_Id'})
    reply: Reply

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}