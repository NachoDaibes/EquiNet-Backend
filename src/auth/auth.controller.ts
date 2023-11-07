import { Controller, Post, Body, Headers, HttpException, HttpStatus, Query, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { ApiTags } from '@nestjs/swagger';
import { EmailDto } from './dto/email.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

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

  @Get('validateCode')
  validateCode(@Query('codigoGenerado') codigoGenerado: string, @Query('codigoIngresado') codigoIngresado: string){
    return this.authService.validateCode(codigoGenerado, codigoIngresado)
  }
  
  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {

    return this.authService.loginUser(loginAuthDto);
  }

  @Post('/changePassword')
  changePassowrd(@Body() changePasswordDto: ChangePasswordDto){
    return this.authService.changePassword(changePasswordDto)
  }
  
  @Post('/restorePassword')
  restorePassword(@Query('email') email: string, @Query('password') password: string, @Query('validationCode') validationCode: boolean){
    return this.authService.restorePassword(email, password, validationCode)
  }

}
