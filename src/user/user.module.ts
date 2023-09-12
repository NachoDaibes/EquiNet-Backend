import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { TypeService } from 'src/type/type.service';
import { Type } from 'src/entities/type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Type])    
  ],
  controllers: [UserController],
  providers: [UserService, TypeService]
})
export class UserModule {}
