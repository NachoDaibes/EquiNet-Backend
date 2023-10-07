import { Module } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { DiscussionController } from './discussion.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TypeService } from 'src/type/type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from 'src/entities/discussion.entity';
import { DiscussionStatus } from 'src/entities/discussionStatus.entity';
import { Type } from 'src/entities/type.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserProfile } from 'src/entities/userProfile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { UserStatus } from 'src/entities/userStatus.entity';
import { User } from 'src/entities/user.entity';
import { Reply } from 'src/entities/reply.entity';
import { ReplyStatus } from 'src/entities/replyStatus.entity';
import { Topic } from 'src/entities/topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Discussion, DiscussionStatus, Type, Topic, Profile, User, UserProfile, UserProfileStatus, UserStatus
    , Reply, ReplyStatus])
  ],
  controllers: [DiscussionController],
  providers: [DiscussionService, AuthService, JwtService, TypeService]
})
export class DiscussionModule {}
