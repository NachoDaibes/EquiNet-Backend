import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { UserType } from "./userType.entity";

@Entity({name: 'UserTypeProfile'})
export class UserTypeProfile{

    @PrimaryGeneratedColumn({name: 'id'})
    id: number

    @ManyToOne(() => UserType, (userType) => userType.userTypeProfile)
    @JoinColumn({name: 'userType_Id'})
    userType: UserType

    @ManyToOne(() => Profile, (profile) => profile.userTypeProfile)
    @JoinColumn({name: 'profile_Id'})
    profile: Profile
}