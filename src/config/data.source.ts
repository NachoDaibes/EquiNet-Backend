import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { User } from "src/entities/user.entity";
import { Access } from "src/entities/access.entity";
import { AccessStatus } from "src/entities/accessStatus.entity";
import { IndividualPerson } from "src/entities/individualPerson.entity";
import { LegalPerson } from "src/entities/legalPerson.entity";
import { Profile } from "src/entities/profile.entity";
import { ProfileAccess } from "src/entities/profileAccess.entity";
import { ProfileStatus } from "src/entities/profileStatus.entity";
import { Type } from "src/entities/type.entity";
import { TypeConfig } from "src/entities/typeConfig.entity";
import { UserStatus } from "src/entities/userStatus.entity";
import { UserType } from "src/entities/userType.entity";
import { UserTypeProfile } from "src/entities/userTypeProfile.entity";
import { UserTypeStatus } from "src/entities/userTypeStatus.entity";
import { UserUserType } from "src/entities/userUserType.entity";
import { UserUserTypeStatus } from "src/entities/userUserTypeStatus.entity";

const dest= "dist/common/envs/";
const env: string | undefined = process.env.NODE_ENV;
const fallback: string = resolve(`${dest}/local.env`);
const filename: string = env ? `${env}.env` : 'local.env';
let filePath: string = resolve(`${dest}/${filename}`);
dotenv.config({ path: filePath })
console.log("filePath:"+filePath)

let dist: string = resolve('dist/entities/user.entity.js');
console.log("entities-filePath:"+dist)
console.log("DATABASE_HOST:"+process.env.DATABASE_HOST)
// if (process.platform === "win32")
// normalizedPath = normalizedPath.replace(/\\/g, "/")

 export const Config:DataSourceOptions={
    type: "mssql",
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    //entities: ["dist/**/*.entity{.ts,.js}"],
    entities:[User, Access, AccessStatus, IndividualPerson, LegalPerson, Profile, 
      ProfileAccess, ProfileStatus, Type, TypeConfig, UserStatus, UserType, UserTypeProfile, 
      UserTypeStatus, UserUserType, UserUserTypeStatus],
    migrations: [dist+"/migrations/*{.ts,.js}"],
    migrationsRun:false,
      synchronize:false,
      extra: {
        trustServerCertificate: true,
        enableArithAbort: false,
      },
      pool: {
        max: 100,
        min: 10,
        idleTimeoutMillis: 30000
      },
      options:{
        encrypt: false,
      },
}
export const AppDataSource: DataSource = new DataSource(Config);
AppDataSource.initialize();