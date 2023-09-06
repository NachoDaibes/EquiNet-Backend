import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { profile } from "console";
import { ProfileTypeStatus } from "./profileTypeStatus.entity";

@Entity({name: 'ProfileType'})
export class ProfileType{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @OneToMany(() => Profile, (profile) => profile.profileType)
    profile: Profile[]

    @OneToMany(() => ProfileTypeStatus, (profileTypeStatus) => profileTypeStatus.profileType)
    profileTypeStatus: ProfileTypeStatus[]
}