import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { Profile } from "./profile.entity"

@Entity({name: 'ProfileStatus'})
export class ProfileStatus{
    
    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @JoinColumn({name: 'profileStatusType_Id'})
    profileStatusType: Type

    @JoinColumn({name: 'profileStatusReasonType_Id'})
    profileStatusReasonType: Type

    @Column({name: 'statusRegistrationDatetime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => Profile, (profile) => profile.profileStatus)
    @JoinColumn({name: 'profile_Id'})
    profile: Profile
}