
import { Type } from "src/entities/type.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserStatus } from "./userStatus.entity";
import { LegalPerson } from "./legalPerson.entity";
import { IndividualPerson } from "./individualPerson.entity";
import { UserUserType } from "./userUserType.entity";


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

    @Column({name: 'failLoginCount'})
    failLoginCount: number

    @Column({name: 'lastLogin'})
    lastLogin: Date

    @Column({name: 'sessionOpen'})
    sessionOpen: number

    @Column({name: 'sessionId'})
    sessionId: number
    
    @OneToOne(() => Type)
    @JoinColumn({name: 'userType'})
    usertype: Type

    @OneToMany(() => UserStatus, (userStatus) => userStatus.user)
    userStatus: UserStatus[]

    @OneToMany(() => LegalPerson, (legalPerson) => legalPerson.user)
    legalPerson: LegalPerson[]

    @OneToMany(() => IndividualPerson, (individualPerson) => individualPerson.user)
    individualPerson: IndividualPerson[]

    @OneToMany(() => UserUserType, (userUserType) => userUserType.user)
    userUserType: UserUserType[]
}