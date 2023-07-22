import { IsBoolean, IsString } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProfileAccess } from "./profileAcces.entity"

@Entity({name: 'Access'})
export class Access{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name'})
    name: string

    @Column({name: 'active'})
    active: boolean

    @OneToMany(() => ProfileAccess, (profileAccess) => profileAccess.access)
    profileAccess: ProfileAccess[]
}