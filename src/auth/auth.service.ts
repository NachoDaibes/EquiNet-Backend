import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { hash, compare } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { TypeService } from 'src/type/type.service';
import { Profile } from 'src/entities/profile.entity';
import { UserProfile } from 'src/entities/userProfile.entity';
import { UserProfileStatus } from 'src/entities/userProfileStatus';
import { UserStatus } from 'src/entities/userStatus.entity';
import { EmailService } from 'src/email/email.service';
import { EmailDto } from './dto/email.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

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
    private typeService: TypeService,
    private emailService: EmailService,
  ) {}

  // private codigo: string
  async registerUser(
    registerAuthDto: RegisterAuthDto,
    validationCode: Boolean,
  ) {
    if (validationCode == false) {
      throw new BadRequestException('El código verificador es incorrecto');
    }

    const { email, password } = registerAuthDto;
    const plainToHash = await hash(password, 10);

    registerAuthDto = { ...registerAuthDto, password: plainToHash };

    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (user)
      throw new HttpException(
        'Ya existe un usuario con el email ingresado',
        404,
      );

    const userProfileStatusTypeActivo = await this.typeService.findTypeByCode(
      'UPSTActivo',
    );
    const userStatusActivo = await this.typeService.findTypeByCode('USTActivo');
    const { profileType, ...toCreate } = registerAuthDto;

    let profile;
    if (profileType == 'Miembro') {
      profile = await this.profileRepository.findOne({
        where: { name: 'Miembro Activo' },
      });
    }
    if (profileType == 'Propietario') {
      profile = await this.profileRepository.findOne({
        where: { name: 'Propietario Activo' },
      });
    }
    if (profileType == 'Administrador') {
      profile = await this.profileRepository.findOne({
        where: { name: 'Administrador Activo' },
      });
    }

    const u = this.userRepository.create(toCreate);

    const userProfileStatus = this.userProfileStatusRepository.create({
      userProfileStatusType: userProfileStatusTypeActivo,
    });

    const userProfile = this.userProfileRepository.create({
      profile: profile,
      userProfileStatus: [userProfileStatus],
    });

    const userStatus = this.userStatusRepository.create({
      userStatusType: userStatusActivo,
    });

    u.userStatus = [userStatus];
    u.userProfile = [userProfile];

    let userFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        console.log(transaction);
        userFinal = await transaction.save(u);
      } catch (error) {
        throw new Error(error);
      }
    });

    return userFinal;
  }

  async loginUser(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const user = await this.userRepository.findOne({
      relations: [
        'userProfile',
        'userProfile.profile',
        'userProfile.profile.profileType',
        'userProfile.profile.profileAccess',
        'userProfile.profile.profileAccess.access',
      ],
      where: {
        email: email,
      },
    });

    if (!user) throw new HttpException('User Not Found', 404);

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) throw new HttpException('Incorrect Password', 403);

    let access = [];
    for (const userProfile of user.userProfile) {
      for (const profileAccess of userProfile.profile.profileAccess) {
        access.push(profileAccess.access.name);
      }
    }

    const payload = {
      id: user.id,
      username: user.username,
      access: access,
    };
    const token = await this.jwtAuthService.sign(payload);

    const data = {
      user: user,
      token,
    };

    return data;
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: changePasswordDto.userId,

      }
    });
    if (!user) {
      throw new HttpException(
        'No existe un usuario con el id ingresado',
        HttpStatus.NOT_FOUND,
      );
    }
    const {currentPassword, password} = changePasswordDto

    const checkPassword = await compare(
      currentPassword,
      user.password,
    );
    if (!checkPassword) throw new HttpException('Incorrect Password', 403);

    const plainToHash = await hash(password, 10);
    changePasswordDto = { ...changePasswordDto, password: plainToHash };

    const userToUpdate = await this.userRepository.preload({
      id: changePasswordDto.userId,
      ...changePasswordDto
    })

    let userFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        userFinal = await transaction.save(userToUpdate);
      } catch (error) {
        throw new Error(error);
      }
    });

    return userFinal;
  }

  async restorePassword(email: string, password: string, validationCode: boolean){
    if (validationCode == false) {
      throw new BadRequestException('El código verificador es incorrecto');
    }

    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    })

    const plainToHash = await hash(password, 10);

    const userToUpdate = await this.userRepository.preload({
      id: user.id,
      password: plainToHash
    })

    let userFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        userFinal = await transaction.save(userToUpdate);
      } catch (error) {
        throw new Error(error);
      }
    });

    return userFinal;
  }

  async sendEmailCode(emailDto: EmailDto) {
    //se genera un código aleatorio de 4 dígitos
    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    let response: Object;
    try {
      await this.emailService.sendEmail(
        emailDto.email,
        'Validación de EquiNet',
        `Su código verificador de EquiNet es ${codigo}`,
      );

      // this.codigo = codigo
      return (response = {
        code: codigo,
      });
    } catch (error) {
      throw new Error('Error al enviar mail' + error);
    }
  }

  validateCode(codigoGenerado: string, codigoIngresado): Boolean {
    return codigoGenerado == codigoIngresado;
  }

  validateAccess(token: string) {
    const tokenFinal = token.slice(7);
    const decodedToken: any = this.jwtAuthService.decode(tokenFinal);
    const access = decodedToken.access;

    return access;
  }
}
