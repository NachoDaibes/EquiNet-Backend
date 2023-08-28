import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { News } from "./news.entity"

@Entity({name: 'NewsStatus'})
export class NewsStatus{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @JoinColumn({name: 'newsStatusType_Id'})
    newsStatusType: Type

    @JoinColumn({name: 'newsStatusReasonType_Id'})
    newsStatusReasonType: Type

    @Column({name: 'statusRegistrationDatetime', type: 'datetime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => News, (news) => news.newsStatus)
    @JoinColumn({name: 'news_Id'})
    news: News
}