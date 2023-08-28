import { HttpException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { hash, compare } from 'bcrypt'
import { User } from 'src/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private jwtAuthService: JwtService
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

    const u = this.userRepository.create(registerAuthDto)

    let userFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        userFinal = await transaction.save(u)
      } catch (error) {
        throw new Error(error);
      }
    })

    return user
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
  
    const {email, password} = loginAuthDto

    const user = await this.userRepository.findOne({
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
