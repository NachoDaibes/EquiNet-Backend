import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Disability } from "./disability.entity";
import { News } from "./news.entity";
import { Type } from "./type.entity";

@Entity({name: 'DisabilityStatus'})
export class DisabilityStatus{
    
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.newsStatus)
    @JoinColumn({name: 'disabilityStatusType_Id'})
    disabilityStatusType: Type

    @ManyToOne(() => Type, (type) => type.newsStatusReason)
    @JoinColumn({name: 'disabilityStatusReasonType_Id'})
    disabilityStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => Disability, (disability) => disability.disabilityStatus)
    @JoinColumn({name: 'disability_Id'})
    disability: Disability

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}