
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

    @Column({name: 'username', length: 20, nullable: true})
    username: string

    @Column({name: 'email', length: 256, nullable: true})
    email: string

    @Column({name: 'password', length: 127, nullable: true})
    password: string

    @Column({name: 'image', length: 256, nullable: true})
    image: string

    @Column({name: 'failLoginCount', nullable: true})
    failLoginCount: number

    @Column({name: 'lastLogin', nullable: true})
    lastLogin: Date

    @Column({name: 'sessionOpen', nullable: true})
    sessionOpen: number

    @Column({name: 'sessionId', nullable: true})
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