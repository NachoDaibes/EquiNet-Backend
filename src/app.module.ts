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
import { UserType } from './entities/userType.entity';
import { UserTypeProfile } from './entities/userTypeProfile.entity';
import { UserTypeStatus } from './entities/userTypeStatus.entity';
import { UserUserType } from './entities/userUserType.entity';
import { UserUserTypeStatus } from './entities/userUserTypeStatus.entity';
const envFilePath: string = getEnvPath(`${__dirname}/../common/envs`);


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'Kalijose-25',
      database: 'EquiNetDev2',
      entities: [User, Access, AccessStatus, IndividualPerson, LegalPerson, Profile, 
        ProfileAccess, ProfileStatus, Type, TypeConfig, UserStatus, UserType, UserTypeProfile, 
        UserTypeStatus, UserUserType, UserUserTypeStatus],
      synchronize: true
      
      // imports: [ConfigModule],
      // useFactory: (configService: ConfigService) =>Config,
    // inject:[ConfigService]
  }),
    ScheduleModule.forRoot(),

    ],
  controllers: [AppController ],
  providers: [AppService]
})
export class AppModule {

  constructor(private dataSource: DataSource) {}

}
