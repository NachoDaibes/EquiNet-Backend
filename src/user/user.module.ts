import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { TypeService } from 'src/type/type.service';
import { Type } from 'src/entities/type.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserProfile } from 'src/entities/userProfile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { UserStatus } from 'src/entities/userStatus.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Type, Profile, UserProfile, UserProfileStatus, UserStatus, UserProfile, UserProfileStatus, Profile])    
  ],
  controllers: [UserController],
  providers: [UserService, TypeService, AuthService, JwtService, EmailService]
})
export class UserModule {}
