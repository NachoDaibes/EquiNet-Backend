import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Type } from "./type.entity";
import { UserStatus } from "./userStatus.entity";
import { ProfileUser } from "./profileUser.entity";

@Entity({name: 'User'})
export class User{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'username', length: 20})
    username: string

    @Column({name: 'email', length: 256})
    email: string

    @Column({name: 'password', length: 127})
    password: string

    @Column({name: 'image', length: 256})
    image: string

    @Column({name: 'isAdvanced'})
    isAdvanced: boolean

    @OneToOne(() => Type)
    @JoinColumn({name: 'userType'})
    usertype: Type

    @OneToMany(() => UserStatus, (userStatus) => userStatus.user)
    userStatus: UserStatus[]

    @OneToMany(() => ProfileUser, (profileUser) => profileUser.user)
    profileUser: ProfileUser[]
}