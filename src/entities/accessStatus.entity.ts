import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { Access } from "./access.entity"

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

    @ManyToOne(() => Access, (access) => access.accessStatus)
    @JoinColumn({name: 'access_Id'})
    access: Access
}