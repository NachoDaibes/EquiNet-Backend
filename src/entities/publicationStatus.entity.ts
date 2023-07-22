import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsObject } from "class-validator";
import { Type } from "./type.entity";

@Entity({name: 'PublicationStatus'})
export class PublicationStatus{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @OneToOne(() => Type)
    @JoinColumn({name: 'publicationStatusType_Id'})
    publicationStatusType: Type

    @OneToOne(() => Type)
    @JoinColumn({name: 'publicationStatusReasonType_Id'})
    publicationStatusReasonType: Type

    @Column({name: 'statusRegistrationDatetime'})
    statusRegistrationDateTime: Date
}