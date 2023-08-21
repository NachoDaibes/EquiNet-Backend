import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { UserUserType } from "./userUserType.entity"

@Entity({name: 'UserUserTypeStatus'})
export class UserUserTypeStatus{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @OneToOne(() => Type)
    @JoinColumn({name: 'userUserTypeStatus_Id'})
    userUserTypeStatusType: Type

    @OneToOne(() => Type)
    @JoinColumn({name: 'userUserTypeStatusReasonType_Id'})
    userUserTypeStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime_Id'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => UserUserType, (userUserType) => userUserType.userUserTypeStatus)
    @JoinColumn({name: 'userUserType_Id'})
    userUserType: UserUserType
}