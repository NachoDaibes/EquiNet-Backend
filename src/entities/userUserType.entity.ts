import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { UserType } from "./userType.entity"
import { UserUserTypeStatus } from "./userUserTypeStatus.entity"

@Entity({name: 'UserUserType'})
export class UserUserType{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.userUserType)
    @JoinColumn({name: 'user_Id'})
    user: User

    @ManyToOne(() => UserType, (userType) => userType)
    @JoinColumn({name: 'userType_Id'})
    userType: UserType

    @OneToMany(() => UserUserTypeStatus, (userUserTypeStatus)=> userUserTypeStatus.userUserType)
    userUserTypeStatus: UserUserTypeStatus[]
}