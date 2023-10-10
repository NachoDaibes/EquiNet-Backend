import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { TypeService } from 'src/type/type.service';
import { UserProfile } from 'src/entities/userProfile.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { UserStatus } from 'src/entities/userStatus.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserStatus)
    private readonly userStatusRepository: Repository<UserStatus>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    @InjectRepository(UserProfileStatus)
    private readonly userProfileStatusRepository: Repository<UserProfileStatus>,
    private readonly entityManager: EntityManager,
    private readonly typeService: TypeService
  ){}

  async create(createUserDto: CreateUserDto) {
    return 'This create'
  }

  async findAll() {
    const users = await this.userRepository.find({})
    return users
  }

  async findOne(id: number) {

    const userStatusActivo = await this.typeService.findTypeByCode('USTActivo')

    const user = await this.userRepository.findOne({
      relations: ['legalPerson', 'individualPerson', 'userStatus', 'legalPerson', 'individualPerson', 'userStatus.userStatusType'],
      where: {
        id: id,
        userStatus: {
          userStatusType: userStatusActivo
        }
      }
    })

    if(!user) throw new HttpException('No existe un usuario con id = '+ id, HttpStatus.NOT_FOUND)

    return user
  }

  async update(updateUserDto: UpdateUserDto) {
    
    const user = await this.userRepository.findOne({where: {id: updateUserDto.id}})
    
    if(!user){
      return new BadRequestException('No existe un usuario con el id: ' + updateUserDto.id)
    }

    const usertoUpdate = await this.userRepository.preload({id: updateUserDto.id, ...updateUserDto})

    let userFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        console.log(transaction)
        userFinal = await transaction.save(usertoUpdate)
      } catch (error) {
        throw new Error(error);
      }
    })

    return userFinal
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['userStatus', 'userStatus.userStatusType'],
      where: { id: id },
    });

    if (!user) {
      return new NotFoundException('No existe una publicación con id = ' + id);
    }

    const userStatusInactivo = await this.typeService.findTypeByCode(
      'USTInactivo',
    );

    const userStatus = this.userStatusRepository.create({
      userStatusType: userStatusInactivo
    });

    user.userStatus.push(userStatus);

    let userFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        userFinal = await transaction.save(user);
      } catch (error) {
        throw new Error(error);
      }
    });

    return userFinal;
  }
}
