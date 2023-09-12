import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProfileStatus } from "./profileStatus.entity"
import { ProfileAccess } from "./profileAccess.entity"
import { ProfileType } from "./profileType.entity"
import { UserProfile } from "./userProfile.entity"

@Entity({name: 'Profile'})
export class Profile{
    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name', length: 80})
    name: string

    @OneToMany(() => ProfileStatus, (profileStatus) => profileStatus.profile)
    profileStatus: ProfileStatus[]

    @OneToMany(() => ProfileAccess, (profileAccess) => profileAccess.profile)
    profileAccess: ProfileAccess[]

    @ManyToOne(() => ProfileType, (profileType) => profileType.profile)
    @JoinColumn({name: 'profileType_Id'})
    profileType: ProfileType

    @OneToMany(() => UserProfile, (userProfile) => userProfile.profile)
    userProfile: UserProfile[]
}