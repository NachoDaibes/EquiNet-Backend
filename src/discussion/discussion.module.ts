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
import { DiscussionLikes } from 'src/entities/discussionLikes.entity';
import { ReplyLikes } from 'src/entities/replyLikes.entity';
import { Report } from 'src/entities/report.entity';
import { Bookmark } from 'src/entities/bookmark.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Discussion,
      DiscussionStatus,
      Type,
      Topic,
      Profile,
      DiscussionLikes,
      ReplyLikes,
      User,
      UserProfile,
      UserProfileStatus,
      UserStatus,
      Reply,
      ReplyStatus,
      Report, 
      Bookmark
    ]),
  ],
  controllers: [DiscussionController],
  providers: [DiscussionService, AuthService, JwtService, TypeService, EmailService],
})
export class DiscussionModule {}
