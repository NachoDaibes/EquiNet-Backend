import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProfileStatus } from "./profileStatus.entity"
import { UserTypeProfile } from "./userTypeProfile.entity"
import { ProfileAccess } from "./profileAccess.entity"

@Entity({name: 'Profile'})
export class Profile{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 20})
    name: string

    @OneToMany(() => ProfileStatus, (profileStatus) => profileStatus.profile)
    profileStatus: ProfileStatus[]

    @OneToMany(() => UserTypeProfile, (userTypeProfile) => userTypeProfile.profile)
    userTypeProfile: UserTypeProfile[]

    @OneToMany(() => ProfileAccess, (profileAccess) => profileAccess.profile)
    profileAccess: ProfileAccess[]
}