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
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PublicationModule } from './publication/publication.module';
import { JwtStrategy } from './auth/jwtStrategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwtAuthGuard';
import { TypeConfigModule } from './type-config/type-config.module';
import { TypeModule } from './type/type.module';
import { News } from './entities/news.entity';
import { NewsStatus } from './entities/newsStatus.entity';
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
      password: 'Kalijose-25',
      database: 'EquiNetDev',
      entities: [User, Access, AccessStatus, IndividualPerson, LegalPerson, Profile,
        ProfileAccess, ProfileStatus, Type, TypeConfig, UserStatus, UserType, UserTypeProfile,
        UserTypeStatus, UserUserType, UserUserTypeStatus, News, NewsStatus],
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
    PublicationModule,
    TypeConfigModule,
    TypeModule,

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
