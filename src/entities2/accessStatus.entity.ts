import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"

@Entity({name: 'AccessStatus'})
export class AccessStatus{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @JoinColumn({name: 'accessStatusType'})
    accessStatusType: Type

    @JoinColumn({name: 'accessStatusType'})
    accessStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date
}