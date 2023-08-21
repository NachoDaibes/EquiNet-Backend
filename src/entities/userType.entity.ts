import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { UserUserType } from "./userUserType.entity"
import { UserTypeStatus } from "./userTypeStatus.entity"
import { UserTypeProfile } from "./userTypeProfile.entity"

@Entity({name: 'UserType'})
export class UserType{

    @PrimaryGeneratedColumn({name: 'id'})
    id: string

    @Column({name: 'name'})
    name: string

    @OneToMany(() => UserUserType, (userUserType) => userUserType.userType)
    userUserType: UserUserType[]

    @OneToMany(() => UserTypeStatus, (userTypeStatus) => userTypeStatus.userType)
    userTypeStatus: UserTypeStatus[]

    @OneToMany(() => UserTypeProfile, (userTypeProfile) => userTypeProfile.userType)
    userTypeProfile: UserTypeProfile[]

}