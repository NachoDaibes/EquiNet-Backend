import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { TypeService } from 'src/type/type.service';
import { UserProfile } from 'src/entities/userProfile.entity';
import { Profile } from 'src/entities/profile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

    return await this.userRepository.findOne({
      relations: ['legalPerson', 'individualPerson', 'userStatus'],
      where: {
        id: id,
        userStatus: {
          userStatusType: userStatusActivo
        }
      }
    })
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
