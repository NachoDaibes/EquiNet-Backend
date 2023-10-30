import { Controller, Get, Post, Body, Patch, Param, Headers , Delete, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private authService: AuthService
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Headers('authorization') token: string) {

    return this.userService.findAll();
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Administrador Activo')){
      return this.userService.findAll();
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, 
  @Headers('authorization') token: string) {

    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)

    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.userService.findOne(+id);
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)

    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.userService.update(updateUserDto);
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Delete()
  remove(@Query('idUserToDelete') idUserToDelete: string, @Query('idUserLoged') idUserLoged: string, @Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)

    if(profiles.includes('Administrador Activo') || idUserLoged === idUserToDelete){
      return this.userService.remove(+idUserToDelete);
    }
    else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }
}
