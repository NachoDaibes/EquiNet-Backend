import { Profile } from "./profile.entity";
import { UserType } from "./userType.entity";

export class UserTypeProfile{

    id: number

    userType: UserType

    profile: Profile
}