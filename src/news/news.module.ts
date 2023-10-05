import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeService } from 'src/type/type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/news.entity';
import { NewsStatus } from 'src/entities/newsStatus.entity';
import { Type } from 'src/entities/type.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserProfile } from 'src/entities/userProfile.entity';
import { User } from 'src/entities/user.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { UserStatus } from 'src/entities/userStatus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, NewsStatus, Type, Profile, UserProfile, User, UserProfileStatus, UserStatus])
  ],
  controllers: [NewsController],
  providers: [NewsService, AuthService, JwtService, TypeService],
})
export class NewsModule {}
