import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() regiterAuthDto: RegisterAuthDto) {
    return this.authService.registerUser(regiterAuthDto);
  }
  
  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginUser(loginAuthDto);
  }

}
