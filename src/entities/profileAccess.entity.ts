import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Access } from "./access.entity"
import { Profile } from "./profile.entity"

@Entity({name: 'ProfileAccess'})
export class ProfileAccess{

    @PrimaryGeneratedColumn('increment', {name: 'id'})
    id: number

    @ManyToOne(()=> Profile, (profile) => profile.profileAccess)
    @JoinColumn({name: 'profile_Id'})
    profile: Profile

    @ManyToOne(() => Access, (access) => access.profileAccess)
    @JoinColumn({name: 'access_Id'})
    access: Access
}