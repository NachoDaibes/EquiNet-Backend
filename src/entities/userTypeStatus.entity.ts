import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./type.entity";
import { UserType } from "./userType.entity";

@Entity({name: 'UserTypeStatus'})
export class UserTypeStatus{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @OneToOne(() => Type)
    @JoinColumn({name: 'userTypeStatus_Id'})
    userTypeStatusType: Type

    @OneToOne(() => Type)
    @JoinColumn({name: 'userTypeStatusReasonType_Id'})
    userTypeStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => UserType, (userType) => userType.userTypeStatus)
    userType: UserType
}