import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Type } from "./type.entity"
import { UserProfile } from "./userProfile.entity"

@Entity({name: 'UserProfileStatus'})
export class UserProfileStatus{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.userProfileStatus)
    @JoinColumn({name: 'userProfileStatusType_Id'})
    userProfileStatusType: Type

    @ManyToOne(() => Type, (type) => type.userProfileStatusReason)
    @JoinColumn({name: 'userProfileStatusReasonType_Id'})
    userProfileStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => UserProfile, (userProfile) => userProfile.userProfileStatus)
    @JoinColumn({name: 'userProfile_Id'})
    userProfile: UserProfile

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}