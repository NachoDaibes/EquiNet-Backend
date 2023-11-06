import { Controller, Get, Post, Headers, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { AuthService } from 'src/auth/auth.service';
import { ReplyDiscussionDto } from './dto/replyDiscussion.dto';
import { DiscussionLikesDto } from './dto/discussionLikes.dto';
import { ReplyLikesDto } from './dto/replyLikes.dto';
import { CreateReportDto } from './dto/createReport.dto';
import { UpdateReplyDto } from './dto/updateReply.dto';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService,
    private readonly authService: AuthService) {}

  @Post('createDiscussion')
  createDiscussion(@Body() createDiscussionDto: CreateDiscussionDto, @Headers('authorization') token: string) {
    return this.discussionService.createDiscussion(createDiscussionDto);
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Post('reply')
  reply(@Body() replyDiscussionDto: ReplyDiscussionDto, @Headers('authorization') token: string) {
    return this.discussionService.replyDiscussion(replyDiscussionDto);
    if(!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.UNAUTHORIZED)
    }
    const profiles: any[] = this.authService.validateAccess(token)
  
    if(profiles.includes('Miembro Activo') || profiles.includes('Propietario Activo')){
    }else{
      throw new HttpException('No tenés acceso a esta operación', HttpStatus.UNAUTHORIZED)
    }
  }

  @Get('FindAllTopics')
  findAllTopics(@Headers('authorization') token: string) {
    return this.discussionService.findAllTopics();
  }
  
  
  @Get('discussionCountByTopic')
  discussionCountByTopic(@Headers('authorization') token: string, @Query('topicId') topicId: string) {
    return this.discussionService.discussionCountByTopic(+topicId);
  }
  
  @Get()
  findAllDiscussion(@Query('userId') userId: string) {
    return this.discussionService.findAllDiscussions(+userId);
  }
  
  @Get('/findAllDiscussionsByTopic/:topicId')
  findAllDiscussionsByTopic(@Param('topicId') topicId: string) {
    return this.discussionService.findAllDiscussionsByTopic(+topicId);
  }

  @Patch('updateDiscussion/:id')
  updateDiscussion(@Param('id') id: string, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionService.updateDiscussion(+id, updateDiscussionDto);
  }
  
  @Patch('updateReply/:id')
  updateReply(@Param('id') id: string, @Body() updateReplyDto: UpdateReplyDto) {
    return this.discussionService.updateReply(+id, updateReplyDto);
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
  
  @Get('/findAllLikedReply')
  findAllLikedReply(@Query('user') user: string){
    return this.discussionService.findAllLikedReply(+user)
  }
  
  @Get('/findAllUserReplies')
  findAllUserReplies(@Query('user') user: string){
    return this.discussionService.findAllUserReplies(+user)
  }

  @Get('/findAllUserDiscussions')
  findAllUserDiscussions(@Query('user') user: string){
    return this.discussionService.findAllUserDiscussions(+user)
  }

  @Get('/findAllReportedDiscussions')
  findAllReportedDiscussions(){
    return this.discussionService.findAllReportedDiscussions()
  }
  
  @Get('/findAllReportedReplies')
  findAllReportedReplies(){
    return this.discussionService.findAllReportedReplies()
  }

  @Get('findOneDiscussion/:discussionId/:userId')
  findOneDiscussion(@Param('discussionId') discussionId: string, @Param('userId') userId: string) {
    return this.discussionService.findOneDiscussion(+discussionId, +userId);
  }
  
  @Get('findAllDisussionReports/:id')
  findAllDisussionReports(@Param('id') id: string) {
    return this.discussionService.findAllDisussionReports(+id);
  }
  
  @Get('findAllReplyReports/:id')
  findAllReplyReports(@Param('id') id: string) {
    return this.discussionService.findAllReplyReports(+id);
  }
  
  @Get('findOneReply/:replyId/:userId')
  findOneReply(@Param('replyId') replyId: string, @Param('userId') userId: string) {
    return this.discussionService.findOneReply(+replyId, +userId);
  }

  @Post('/reportDiscussion')
  reportDiscussion(@Body() createReportDto: CreateReportDto){
    return this.discussionService.reportDiscussion(createReportDto)
  }
  
  @Post('/reportReply')
  reportReply(@Body() createReportDto: CreateReportDto){
    return this.discussionService.reportReply(createReportDto)
  }

  @Delete('removeDiscussion/:id')
  removeDiscussion(@Param('id') id: string){
    return this.discussionService.removeDiscussion(+id)
  }
  @Delete('removeReply/:id')
  removeReply(@Param('id') id: string){
    return this.discussionService.removeReply(+id)
  }

  @Delete('/removeDiscussionLike')
  removeDiscussionLike(@Query('discussionId') discussionId: string, @Query('userId') userId: string){
    return this.discussionService.removeDiscussionLike(+discussionId, +userId)
  }
  
  @Delete('/removeReplyLike')
  removeReplyLike(@Query('replyId') replyId: string, @Query('userId') userId: string){
    return this.discussionService.removeReplyLike(+replyId, +userId)
  }
}
