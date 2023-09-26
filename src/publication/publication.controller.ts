import { Controller, Get, Post, Body, Headers, Patch, Param, Delete, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { AuthService } from 'src/auth/auth.service';

@Controller('publication')
@UseGuards(JwtAuthGuard)
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
    private authService: AuthService
    ) {}

  @Post()
  createPublication(@Body() createPublicationDto: CreatePublicationDto, @Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.publicationService.createPublication(createPublicationDto);
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get()
  findAll(@Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.publicationService.findAll();
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get('by-user/:id')
  findAllByUser(@Param('id') id: string, @Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.publicationService.findAllByUser(+id);
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
      return this.publicationService.findOne(+id);
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto, @Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.publicationService.update(+id, updatePublicationDto);
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.publicationService.remove(+id);
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }
}
