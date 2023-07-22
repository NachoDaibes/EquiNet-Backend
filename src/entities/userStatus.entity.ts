import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./type.entity";
import { User } from "./user.entity";

@Entity({name: 'UserStatus'})
export class UserStatus{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @OneToOne(() => Type)
    @JoinColumn({name: 'userStatusType_Id'})
    userStatusType: Type

    @OneToOne(() => Type)
    @JoinColumn({name: 'userStatusReasonType_Id'})
    userStatusReasonType: Type

    @Column({name: 'statusRegistrationDatetime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => User, (user) => user.userStatus)
    user: User
}