import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./type.entity";
import { ProfileType } from "./profileType.entity";

@Entity({name: 'ProfileTypeStatus'})
export class ProfileTypeStatus{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(() => Type, (type) => type.profileTypeStatus)
    @JoinColumn({name: 'profileTypeStatusType_Id'})
    profileTypeStatusType: Type

    @ManyToOne(() => Type, (type) => type.profileTypeStatusReason)
    @JoinColumn({name: 'profileTypeStatusReasonType_Id'})
    profileTypeStatusReasonType: Type

    @Column({name: 'statusRegistrationDateTime'})
    statusRegistrationDateTime: Date

    @ManyToOne(() => ProfileType, (profileType) => profileType.profileTypeStatus)
    @JoinColumn({name: 'profileType_Id'})
    profileType: ProfileType

    @BeforeInsert()
    private insertRegistrationDate(){
        this.statusRegistrationDateTime = new Date()
    }
}