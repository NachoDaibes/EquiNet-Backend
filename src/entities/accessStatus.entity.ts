import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { Access } from "./access.entity"

@Entity({name: 'AccessStatus'})
export class AccessStatus{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.accessStatus)
    @JoinColumn({name: 'accessStatusType_Id'})
    accessStatusType: Type

    @ManyToOne(() => Type, (type) => type.accessStatusReason)
    @JoinColumn({name: 'accessStatusReasonType_Id'})
    accessStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => Access, (access) => access.accessStatus)
    @JoinColumn({name: 'access_Id'})
    access: Access

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}