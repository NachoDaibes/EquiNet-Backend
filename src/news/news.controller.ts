import { Controller, Get, Post, Body, Patch, Headers, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService,
    private authService: AuthService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto, @Headers('authorization') token: string) {
    return this.newsService.create(createNewsDto);
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Administrador Activo')){
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(+id);
  }
}
