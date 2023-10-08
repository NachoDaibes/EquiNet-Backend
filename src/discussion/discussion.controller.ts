import { Controller, Get, Post, Headers, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { AuthService } from 'src/auth/auth.service';
import { ReplyDiscussionDto } from './dto/replyDiscussion.dto';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService,
    private readonly authService: AuthService) {}

  @Post('createDiscussion')
  createDiscussion(@Body() createDiscussionDto: CreateDiscussionDto, @Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.discussionService.createDiscussion(createDiscussionDto);
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Post('reply')
  reply(@Body() replyDiscussionDto: ReplyDiscussionDto, @Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.discussionService.replyDiscussion(replyDiscussionDto);
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get('FindAllTopics')
  findAllTopics(@Headers('authorization') token: string) {
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
      return this.discussionService.findAllTopics();
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get(':id')
  findOneDiscussion(@Param('id') id: string) {
    return this.discussionService.findOneDiscussion(+id);
  }
  
  @Get()
  findAllDiscussion() {
    return this.discussionService.findAllDiscussions();
  }
  
  @Get('/findAllDiscussionsByTopic/:topicId')
  findAllDiscussionsByTopic(@Param('topicId') topicId: string) {
    return this.discussionService.findAllDiscussionsByTopic(+topicId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionService.update(+id, updateDiscussionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discussionService.remove(+id);
  }
}
