import { Controller, Get, Post, Body, Patch, Param, Headers , Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Headers('authorization') token: string) {

    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.userService.findAll();
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('authorization') token: string) {

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
