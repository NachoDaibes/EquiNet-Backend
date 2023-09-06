import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { News } from "./news.entity"

@Entity({name: 'NewsStatus'})
export class NewsStatus{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.accessStatus)
    @JoinColumn({name: 'newsStatusType_Id'})
    newsStatusType: Type

    @ManyToOne(() => Type, (type) => type.accessStatusReason)
    @JoinColumn({name: 'newsStatusReasonType_Id'})
    newsStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => News, (news) => news.newsStatus)
    @JoinColumn({name: 'news_Id'})
    news: News

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}