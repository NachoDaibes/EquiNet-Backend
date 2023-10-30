import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publication } from 'src/entities/publication.entity';
import { PublicationStatus } from 'src/entities/publicationStatus.entity';
import { TypeService } from 'src/type/type.service';
import { Type } from 'src/entities/type.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserProfile } from 'src/entities/userProfile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { UserStatus } from 'src/entities/userStatus.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { PublicationPosition } from 'src/entities/publicationPosition.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Publication,
      PublicationStatus,
      Type,
      Profile,
      User,
      UserProfile,
      UserProfileStatus,
      UserStatus,
      PublicationPosition,
    ]),
  ],
  controllers: [PublicationController],
  providers: [PublicationService, TypeService, AuthService, JwtService, EmailService],
})
export class PublicationModule {}
