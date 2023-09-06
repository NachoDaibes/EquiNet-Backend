import { IsNumber, IsString } from "class-validator"
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TypeConfig } from "./typeConfig.entity"
import { IndividualPerson } from "./individualPerson.entity"
import { AccessStatus } from "./accessStatus.entity"
import { News } from "./news.entity"
import { NewsStatus } from "./newsStatus.entity"
import { UserStatus } from "./userStatus.entity"
import { ProfileTypeStatus } from "./profileTypeStatus.entity"
import { profile } from "console"
import { UserProfileStatus } from "./userProfileStatus"
import { ProfileStatus } from "./profileStatus.entity"

@Entity({name: 'Type'})
export class Type{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @Column({name: 'name', length: 80})
    name: string

    @Column({name: 'code', length: 80})
    code: string

    @Column({name: 'order'})
    order: number

    @Column({name: 'filter', length: 80})
    filter: string

    @ManyToOne(() => TypeConfig, (typeConfig) => typeConfig.type)
    @JoinColumn({name: 'typeConfig_Id'})
    typeConfig: TypeConfig

    @OneToMany(() => IndividualPerson, (individualPerson) => individualPerson.identityType)
    individualPerson: IndividualPerson[]
    
    @OneToMany(() => AccessStatus, (accesStatus) => accesStatus.accessStatusType)
    accessStatus: AccessStatus[]
    
    @OneToMany(() => AccessStatus, (accesStatus) => accesStatus.accessStatusReasonType)
    accessStatusReason: AccessStatus[]
    
    @OneToMany(() => NewsStatus, (newsStatus) => newsStatus.newsStatusType)
    newsStatus: NewsStatus[]
    
    @OneToMany(() => NewsStatus, (newsStatus) => newsStatus.newsStatusReasonType)
    newsStatusReason: NewsStatus[]
    
    @OneToMany(() => UserStatus, (userStatus) => userStatus.userStatusType)
    userStatus: UserStatus[]
    
    @OneToMany(() => UserStatus, (userStatus) => userStatus.userStatusReasonType)
    userStatusReason: UserStatus[]
    
    @OneToMany(() => ProfileTypeStatus, (profileTypeStatus) => profileTypeStatus.profileTypeStatusType)
    profileTypeStatus: ProfileTypeStatus[]
    
    @OneToMany(() => ProfileTypeStatus, (profileTypeStatus) => profileTypeStatus.profileTypeStatusReasonType)
    profileTypeStatusReason: ProfileTypeStatus[]
    
    @OneToMany(() => ProfileStatus, (profileStatus) => profileStatus.profileStatusType)
    profileStatus: ProfileTypeStatus[]
    
    @OneToMany(() => ProfileStatus, (profileStatus) => profileStatus.profileStatusReasonType)
    profileStatusReason: ProfileTypeStatus[]
    
    @OneToMany(() => UserProfileStatus, (userProfileStatus) => userProfileStatus.userProfileStatusType)
    userProfileStatus: UserProfileStatus[]
    
    @OneToMany(() => UserProfileStatus, (userProfileStatus) => userProfileStatus.userProfileStatusReasonType)
    userProfileStatusReason: UserProfileStatus[]
}