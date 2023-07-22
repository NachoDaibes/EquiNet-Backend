import { IsBoolean, IsString } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProfileAccess } from "./profileAcces.entity"
import { ProfileUser } from "./profileUser.entity"

@Entity({name: 'Profile'})
export class Profile{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @Column({name: 'active'})
    active: boolean

    @OneToMany(() => ProfileAccess, (profileAccess) => profileAccess.profile)
    profileAccess: ProfileAccess[]

    @OneToMany(() => ProfileUser, (profileUser) => profileUser.profile)
    profileUser: ProfileUser[]
}