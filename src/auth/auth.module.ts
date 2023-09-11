import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwtConstanst';
import { JwtStrategy } from './jwtStrategy';
import { Profile } from 'src/entities/profile.entity';
import { UserProfile } from 'src/entities/userProfile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { TypeService } from 'src/type/type.service';
import { Type } from 'src/entities/type.entity';
import { UserStatus } from 'src/entities/userStatus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Type, Profile, UserProfile, UserProfileStatus, UserStatus]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '20h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, TypeService]
})
export class AuthModule {}
