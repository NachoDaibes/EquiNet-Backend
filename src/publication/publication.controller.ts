import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { AuthService } from 'src/auth/auth.service';
import { ImprovePublicationDto } from './dto/improve-publication-dto';
import { CreatePublicationByAdminDto } from './dto/create-publication-admin.dto';
import { UpdatePublicationByAdminDto } from './dto/update-admin.dto';

@Controller('publication')
export class PublicationController {
  constructor(
    private readonly publicationService: PublicationService,
    private authService: AuthService,
  ) {}

  @Post()
  createPublication(
    @Body() createPublicationDto: CreatePublicationDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const access: any[] = this.authService.validateAccess(token);

    if (access.includes('Create Publication')) {
      return this.publicationService.createPublication(createPublicationDto);
    } else {
      throw new HttpException(
        'No tenés acceso a esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('admin')
  createPublicationByAdmin(
    @Body() createPublicationByAdminDto: CreatePublicationByAdminDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const profiles: any[] = this.authService.validateAccess(token);

    if (profiles.includes('Administrador Activo')) {
      return this.publicationService.createPublicationByAdmin(
        createPublicationByAdminDto,
      );
    } else {
      throw new HttpException(
        'No tenés acceso a esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('improve-publication')
  improvePublication(
    @Body() improvePublication: ImprovePublicationDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const profiles: any[] = this.authService.validateAccess(token);

    if (
      profiles.includes('Miembro Activo') ||
      profiles.includes('Propietario Activo')
    ) {
      return this.publicationService.improvePublication(improvePublication);
    } else {
      throw new HttpException(
        'No tenés acceso a esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get()
  findAll(
    @Query('disabilityFilter') disabilityFilter: string,
    @Query('politicalDivisionFilter') politicalDivisionFilter: string,
    @Query('departmentFilter') departmentFilter: string,
    @Query('locationFilter') locationFilter: string,
    @Query('publicationTypeFilter') publicationTypeFilter: string,
  ) {
    return this.publicationService.findAll(
      disabilityFilter,
      politicalDivisionFilter,
      departmentFilter,
      locationFilter,
      publicationTypeFilter,
    );
  }

  @Get('admin')
  findAllAdmin(@Headers('authorization') token: string) {
    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const profiles: any[] = this.authService.validateAccess(token);

    if (profiles.includes('Administrador Activo')) {
      return this.publicationService.findAllByAdmin();
    } else {
      throw new HttpException(
        'No tenés acceso a esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('by-user/:id')
  findAllByUser(
    @Param('id') id: string,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const profiles: any[] = this.authService.validateAccess(token);

    if (profiles.includes('Propietario Activo')) {
      return this.publicationService.findAllByUser(+id);
    } else {
      throw new HttpException(
        'No tenés acceso a esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const profiles: any[] = this.authService.validateAccess(token);

    if (
      profiles.includes('Miembro Activo') ||
      profiles.includes('Propietario Activo')
    ) {
      return this.publicationService.update(+id, updatePublicationDto);
    } else {
      throw new HttpException(
        'No tenés acceso a esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Patch('admin/:id')
  updateByAdmin(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationByAdminDto,
    @Headers('authorization') token: string,
  ) {
    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const profiles: any[] = this.authService.validateAccess(token);

    if (profiles.includes('Administrador Activo')) {
      return this.publicationService.update(+id, updatePublicationDto);
    } else {
      throw new HttpException(
        'No tenés acceso a esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('authorization') token: string) {
    if (!token) {
      throw new HttpException(
        'Token no proporcionado',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const profiles: any[] = this.authService.validateAccess(token);

    if (
      profiles.includes('Administrador Activo') ||
      profiles.includes('Propietario Activo')
    ) {
      return this.publicationService.remove(+id);
    } else {
      throw new HttpException(
        'No tenés acceso a esta operación',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
