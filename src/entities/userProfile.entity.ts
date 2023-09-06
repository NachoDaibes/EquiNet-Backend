import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"
import { UserProfileStatus } from "./userProfileStatus"
import { Profile } from "./profile.entity"

@Entity({name: 'UserProfile'})
export class UserProfile{

    @PrimaryGeneratedColumn('increment',{name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.userProfile)
    @JoinColumn({name: 'user_Id'})
    user: User

    @ManyToOne(() => Profile, (profile) => profile.userProfile)
    @JoinColumn({name: 'profile_Id'})
    profile: Profile

    @OneToMany(() => UserProfileStatus, (userProfileStatus)=> userProfileStatus.userProfile, {cascade: true})
    userProfileStatus: UserProfileStatus[]
}