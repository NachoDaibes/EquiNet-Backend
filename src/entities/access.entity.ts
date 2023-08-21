import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { AccessStatus } from "./accessStatus.entity"
import { ProfileAccess } from "./profileAccess.entity"

@Entity({name: 'Access'})
export class Access{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @Column({name: 'name', length: 20})
    name: string

    @Column({name: 'description', length: 50})
    description: string

    @Column({name: 'code', length: 20})
    code: string

    @Column({name: 'url', length: 2000})
    url: string

    @Column({name: 'order'})
    order: number

    @OneToMany(() => AccessStatus, (accessStatus) => accessStatus.access)
    accessStatus: AccessStatus[]

    @OneToMany(() => ProfileAccess, (profileAccess) => profileAccess.access)
    profileAccess: ProfileAccess[]
}