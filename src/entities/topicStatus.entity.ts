import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { Topic } from "./topic.entity"

Entity({name: 'TopicStatus'})
export class TopicStatus{
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.topicStatus)
    @JoinColumn({name: 'topicStatusType_Id'})
    topicStatusType: Type

    @ManyToOne(() => Type, (type) => type.topicStatusReason)
    @JoinColumn({name: 'topicStatusReasonType_Id'})
    topicStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => Topic, (topic) => topic.topicStatus)
    @JoinColumn({name: 'publication_Id'})
    topic: Topic

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}