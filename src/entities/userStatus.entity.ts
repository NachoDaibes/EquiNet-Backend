import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Type } from "./type.entity";

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
    @JoinColumn({name: 'user_Id'})
    user: User
}