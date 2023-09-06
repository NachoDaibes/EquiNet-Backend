import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Type } from "./type.entity";

@Entity({name: 'UserStatus'})
export class UserStatus{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.userStatus)
    @JoinColumn({name: 'userStatusType_Id'})
    userStatusType: Type

    @ManyToOne(() => Type, (type) => type.userStatusReason)
    @JoinColumn({name: 'userStatusReasonType_Id'})
    userStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => User, (user) => user.userStatus)
    @JoinColumn({name: 'user_Id'})
    user: User

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}