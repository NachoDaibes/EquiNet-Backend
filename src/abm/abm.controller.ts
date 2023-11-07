import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AbmService } from './abm.service';
import { CreateDisabilityDto } from './createDtos/disability.dto';
import { CreatePoliticalDivisionDto } from './createDtos/politicalDivision.dto';
import { CreateDepartmentDto } from './createDtos/department.dto';
import { CreateLocationDto } from './createDtos/location.dto';
import { CreateTopicDto } from './createDtos/topic.dto';
import { UpdateDisabilityDto } from './updateDtos/updateDisability.dto';
import { UpdatePoliticalDivisionDto } from './updateDtos/updatePoliticalDivision.dto';
import { UpdateDepartmentDto } from './updateDtos/updateDepartment.dto';
import { UpdateLocationDto } from './updateDtos/updateLocation.dto';
import { UpdateTopicDto } from './updateDtos/updateTopic.dto';
import { CreateAccessDto } from './createDtos/createAccess.dto';
import { CreateProfileDto } from './createDtos/createProfile.dto';
import { AssignDto } from 'src/common/assign.dto';
import { UpdateProfileDto } from './updateDtos/updateProfile.dto';

@Controller('abm')
export class AbmController {
  constructor(private readonly abmService: AbmService) {}

  @Post('/Access')
  createAccess(@Body() createAccessDto: CreateAccessDto){
    return this.abmService.createAccess(createAccessDto)
  }
  
  @Post('/Profile')
  createProfile(@Body() createProfileDto: CreateProfileDto, @Query('userId') userId: string){
    return this.abmService.createProfile(createProfileDto, +userId)
  }
  
  @Get('/Access')
  findAllAccess(){
    return this.abmService.findAllAccess()
  }

  @Post('/Disability')
  createDisability(@Body() createdisabilityDto: CreateDisabilityDto) {
    return this.abmService.createDisability(createdisabilityDto);
  }
  @Post('/PoliticalDivision')
  createPoliticalDivision(
    @Body() createPoliticalDivisionDto: CreatePoliticalDivisionDto,
  ) {
    return this.abmService.createPoliticalDivision(createPoliticalDivisionDto);
  }
  @Post('/Department')
  createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.abmService.createDepartment(createDepartmentDto);
  }
  @Post('/Location')
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.abmService.createLocation(createLocationDto);
  }
  @Post('/Topic')
  createTopic(@Body() createTopicDto: CreateTopicDto) {
    return this.abmService.createTopic(createTopicDto);
  }

  @Get('/Disability')
  findAllDisabilities() {
    return this.abmService.findAllDisabilities();
  }
  @Get('/PoliticalDivision')
  findAllPoliticalDivisions() {
    return this.abmService.findAllPoliticalDivision();
  }
  @Get('/Department')
  findAllDepartments() {
    return this.abmService.findAllDepartments();
  }
  @Get('/Location')
  findAllLocations() {
    return this.abmService.findAllLocations();
  }
  @Get('/Topic')
  findAllTopics() {
    return this.abmService.findAllTopics();
  }
  @Get('/Profile')
  findAllProfile() {
    return this.abmService.findAllProfile();
  }

  @Patch('/Disability')
  updateDisability(@Body() updateDisabilityDto: UpdateDisabilityDto) {
    return this.abmService.updateDisability(updateDisabilityDto);
  }
  @Patch('/PoliticalDivision')
  updatePoliticalDivision(
    @Body() updatePoliticalDivision: UpdatePoliticalDivisionDto,
  ) {
    return this.abmService.updatePoliticalDivision(updatePoliticalDivision);
  }
  @Patch('/Department')
  updateDepartment(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.abmService.updateDepartment(updateDepartmentDto);
  }
  @Patch('/Location')
  updateLocation(@Body() updateLocationDto: UpdateLocationDto) {
    return this.abmService.updateLocation(updateLocationDto);
  }
  @Patch('/Topic')
  updateTopic(@Body() updateTopicDto: UpdateTopicDto) {
    return this.abmService.updateTopic(updateTopicDto);
  }
  @Patch('/Profile')
  updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    return this.abmService.updateProfile(updateProfileDto);
  }

  @Delete('/PoliticalDivision')
  deletePOliticalDivision(@Body() deleteDto: AssignDto) {
    return this.abmService.deletePoliticalDivision(deleteDto);
  }

  @Post('/backup')
  createBackup(){
    return this.abmService.createBackup()
  }

  @Get('/backup')
  readBackups(){
    return this.abmService.readBackups()
  }

  @Post('/restore')
  restoreDatabase(@Query('fileName') fileName: string){
    return this.abmService.restoreBackup(fileName)
  }
}
