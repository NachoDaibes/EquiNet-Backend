import { Controller, Get, Post, Headers, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { AuthService } from 'src/auth/auth.service';
import { ReplyDiscussionDto } from './dto/replyDiscussion.dto';
import { DiscussionLikesDto } from './dto/discussionLikes.dto';
import { ReplyLikesDto } from './dto/replyLikes.dto';
import { CreateReportDto } from './dto/createReport.dto';

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
    return this.discussionService.findAllTopics();
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

  @Post('/discussionLike')
  discussionLike(@Body() discussionLikesDto: DiscussionLikesDto){
    return this.discussionService.discussionLikes(discussionLikesDto)
  }
  
  @Post('/bookmark')
  createBookmark(@Body() createBookmarkDto: DiscussionLikesDto){
    return this.discussionService.createBookmark(createBookmarkDto)
  }
  
  @Get('/findAllBookmarkedDiscussions')
  findAllBookmarkedDiscussions(@Query('user') user: string){
    return this.discussionService.findAllBookmarkedDiscussions(+user)
  }
  
  @Post('/replyLike')
  replyLike(@Body() replyLikesDto: ReplyLikesDto){
    return this.discussionService.replyLikes(replyLikesDto)
  }

  @Get('/findDiscussionsByTitle')
  findDiscussionByTitle(@Query('title') title: string){
    return this.discussionService.findDiscussionByTitle(title)
  }
  
  @Get('/findAllLikedDiscussion')
  findAllLikedDiscussion(@Query('user') user: string){
    return this.discussionService.findAllLikedDiscussion(+user)
  }

  @Get(':id')
  findOneDiscussion(@Param('id') id: string) {
    return this.discussionService.findOneDiscussion(+id);
  }

  @Post('/reportDiscussion')
  reportDiscussion(@Body() createReportDto: CreateReportDto){
    return this.discussionService.reportDiscussion(createReportDto)
  }
  
  @Post('/reportReply')
  reportReply(@Body() createReportDto: CreateReportDto){
    return this.discussionService.reportReply(createReportDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discussionService.remove(+id);
  }
}
