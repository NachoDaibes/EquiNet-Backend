import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from './config/data.source';
import { ScheduleModule } from '@nestjs/schedule';
import { getEnvPath } from './common/helper/env.helper';
import { User } from './entities/user.entity';
import { Access } from './entities/access.entity';
import { AccessStatus } from './entities/accessStatus.entity';
import { IndividualPerson } from './entities/individualPerson.entity';
import { LegalPerson } from './entities/legalPerson.entity';
import { Profile } from './entities/profile.entity';
import { ProfileAccess } from './entities/profileAccess.entity';
import { ProfileStatus } from './entities/profileStatus.entity';
import { Type } from './entities/type.entity';
import { TypeConfig } from './entities/typeConfig.entity';
import { UserStatus } from './entities/userStatus.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './auth/jwtStrategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwtAuthGuard';
import { TypeConfigModule } from './type-config/type-config.module';
import { TypeModule } from './type/type.module';
import { News } from './entities/news.entity';
import { NewsStatus } from './entities/newsStatus.entity';
import { ProfileType } from './entities/profileType.entity';
import { UserProfileStatus } from './entities/userProfileStatus';
import { UserProfile } from './entities/userProfile.entity';
import { ProfileTypeStatus } from './entities/profileTypeStatus.entity';
import { PublicationModule } from './publication/publication.module';
import { Publication } from './entities/publication.entity';
import { Service } from './entities/service.entity';
import { Job } from './entities/job.entity';
import { Donation } from './entities/donation.entity';
import { PublicationStatus } from './entities/publicationStatus.entity';
import { Department } from './entities/department.entity';
import { PoliticalDivision } from './entities/politicalDivision.entity';
import { Disability } from './entities/disability.entity';
import { PublicationDisability } from './entities/publicationDisability.entity';
import { DisabilityStatus } from './entities/disabilityStatus.entity';
import { Location } from './entities/location.entity';
import { LocationModule } from './location/location.module';
import { DepartmentModule } from './department/department.module';
import { PoliticalDivisionModule } from './political-division/political-division.module';
import { DisabilityModule } from './disability/disability.module';
import { Image } from './entities/image.entity';
const envFilePath: string = getEnvPath(`${__dirname}/../common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),

    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => Config,
    //   inject: [ConfigService]
    // }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'sa',
      // password: 'r00t.R00T',
      password: 'Kalijose-25',
      database: 'EquiNetDev',
      entities: [
        User, Access, AccessStatus, IndividualPerson, LegalPerson, Profile,
        ProfileAccess, ProfileStatus, Type, TypeConfig, UserStatus, News, NewsStatus, 
        ProfileStatus, UserProfile, UserProfileStatus, ProfileType, ProfileTypeStatus, 
        Publication, Service, Job, Donation, PublicationStatus, Location, Department,
        PoliticalDivision, PublicationDisability, Disability, DisabilityStatus, Image
      ],
      synchronize: true,
      migrationsRun: true,
      options: {
        encrypt: false
      }
      // imports: [ConfigModule],
      // useFactory: (configService: ConfigService) =>Config,
      // inject:[ConfigService]
    }),
    ScheduleModule.forRoot(),
    AuthModule, 
    UserModule,
    TypeConfigModule,
    TypeModule,
    PublicationModule,
    LocationModule,
    DepartmentModule,
    PoliticalDivisionModule,
    DisabilityModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // }
  ]
})
export class AppModule {

  constructor(private dataSource: DataSource) { }

}
