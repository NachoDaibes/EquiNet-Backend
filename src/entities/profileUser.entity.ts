import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Profile } from "./profile.entity";
import { profile } from "console";

@Entity({name: 'ProfileUser'})
export class ProfileUser{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @ManyToOne(() => User, (user) => user.profileUser)
    @JoinColumn({name: 'user_Id'})
    user: User

    @ManyToOne(() => Profile, (profile) => profile.profileUser)
    @JoinColumn({name: 'profile_Id'})
    profile: Profile
}