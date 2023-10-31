import { Controller, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { ApiTags } from '@nestjs/swagger';
import { EmailDto } from './dto/email.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
    ) {}

  @Post('register')
  registerUser(@Body() regiterAuthDto: RegisterAuthDto, verificationCode: boolean) {
    return this.authService.registerUser(regiterAuthDto, verificationCode);
  }

  @Post('sendEmail')
  sendEmail(@Body() emailDto: EmailDto){
    return this.authService.sendEmailCode(emailDto)
  }
  
  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {

    return this.authService.loginUser(loginAuthDto);
  }

}
