import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { hash, compare } from 'bcrypt'
import { User } from 'src/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TypeService } from 'src/type/type.service';
import { Profile } from 'src/entities/profile.entity';
import { UserProfile } from 'src/entities/userProfile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { UserStatus } from 'src/entities/userStatus.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    @InjectRepository(UserProfileStatus)
    private readonly userProfileStatusRepository: Repository<UserProfileStatus>,
    @InjectRepository(UserStatus)
    private readonly userStatusRepository: Repository<UserStatus>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private jwtAuthService: JwtService,
    private typeService: TypeService
  ){}

  async registerUser(registerAuthDto: RegisterAuthDto) {

    const { email, password } = registerAuthDto
    const plainToHash = await hash(password, 10)
    
    registerAuthDto = {...registerAuthDto, password:plainToHash}
  
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    }) 

    if(user) throw new HttpException('Ya existe un usuario con el email ingresado', 404)

    const userProfileStatusTypeActivo = await this.typeService.findTypeByCode('UPSTActivo')
    const userStatusActivo = await this.typeService.findTypeByCode('USTActivo')
    const {profileType, ...toCreate} = registerAuthDto
    
    let profile
    if(profileType == 'Miembro'){
      profile = await this.profileRepository.findOne({where: {name: 'Miembro Activo'}})
    }
    if(profileType == 'Propietario'){
      profile = await this.profileRepository.findOne({where: {name: 'Propietario Activo'}})
    }
    if(profileType == 'Administrador'){
      profile = await this.profileRepository.findOne({where: {name: 'Administrador Activo'}})
    }

    const u = this.userRepository.create(toCreate)

    const userProfileStatus = this.userProfileStatusRepository.create({
       userProfileStatusType: userProfileStatusTypeActivo
    })

    const userProfile = this.userProfileRepository.create({
      profile: profile,
      userProfileStatus: [userProfileStatus]
    })

    const userStatus = this.userStatusRepository.create({
      userStatusType: userStatusActivo
    })

    u.userStatus = [userStatus]
    u.userProfile = [userProfile]

    let userFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        console.log(transaction)
        userFinal = await transaction.save(u)
      } catch (error) {
        throw new Error(error);
      }
    })

    return userFinal
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
  
    const {email, password} = loginAuthDto

    const user = await this.userRepository.findOne({
      relations: ['userProfile', 'userProfile.profile', 'userProfile.profile.profileType', ],
      where: {
        email: email
      }
    }) 

    if(!user) throw new HttpException('User Not Found', 404)

    const checkPassword = await compare(password, user.password)

    if(!checkPassword) throw new HttpException('Incorrect Password', 403)
  
    const payload = {
      id: user.id,
      username: user.username
    }
    const token = await this.jwtAuthService.sign(payload)

    const data = {
      user: user,
      token
    }

    return data

  }
}
