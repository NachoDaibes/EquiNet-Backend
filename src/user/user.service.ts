import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { TypeService } from 'src/type/type.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    
    const user = await this.userRepository.findOne({where: {id: id}})

    if(!user){
      return new BadRequestException('No existe un usuario con el id: ' + id)
    }
    
    const usertoUpdate = this.userRepository.update(id, updateUserDto)

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
