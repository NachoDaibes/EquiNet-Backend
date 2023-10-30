import { Module } from '@nestjs/common';
import { AbmService } from './abm.service';
import { AbmController } from './abm.controller';
import { TypeService } from 'src/type/type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disability } from 'src/entities/disability.entity';
import { PoliticalDivision } from 'src/entities/politicalDivision.entity';
import { Topic } from 'src/entities/topic.entity';
import { DisabilityStatus } from 'src/entities/disabilityStatus.entity';
import { TopicStatus } from 'src/entities/topicStatus.entity';
import { Location } from 'src/entities/location.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Department } from 'src/entities/department.entity';
import { Type } from 'src/entities/type.entity';
import { User } from 'src/entities/user.entity';
import { UserProfile } from 'src/entities/userProfile.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { UserStatus } from 'src/entities/userStatus.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Disability,
      Location,
      PoliticalDivision,
      Topic,
      Disability,
      DisabilityStatus,
      TopicStatus,
      Department,
      Type,
      User,
      UserProfile,
      Profile,
      UserProfileStatus,
      UserStatus
    ]),
  ],
  controllers: [AbmController],
  providers: [AbmService, TypeService, AuthService, JwtService, EmailService],
})
export class AbmModule {}
