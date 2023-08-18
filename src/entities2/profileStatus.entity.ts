import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"

@Entity({name: 'ProfileStatus'})
export class ProfileStatus{
    
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @JoinColumn({name: 'profileStatusType_Id'})
    profileStatusType: Type

    @JoinColumn({name: 'profileStatusReasonType_Id'})
    profileStatusReasonType: Type

    @Column({name: 'statusRegistrationDatetime'})
    statusRegistrationDateTime: Date
}