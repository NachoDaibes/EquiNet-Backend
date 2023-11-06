import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Department } from 'src/entities/department.entity';
import { PoliticalDivision } from 'src/entities/politicalDivision.entity';
import { Topic } from 'src/entities/topic.entity';
import { Disability } from 'src/entities/disability.entity';
import { CreateDisabilityDto } from './createDtos/disability.dto';
import { CreateLocationDto } from './createDtos/location.dto';
import { CreatePoliticalDivisionDto } from './createDtos/politicalDivision.dto';
import { CreateDepartmentDto } from './createDtos/department.dto';
import { Location } from 'src/entities/location.entity';
import { CreateTopicDto } from './createDtos/topic.dto';
import { UpdateDisabilityDto } from './updateDtos/updateDisability.dto';
import { UpdatePoliticalDivisionDto } from './updateDtos/updatePoliticalDivision.dto';
import { UpdateDepartmentDto } from './updateDtos/updateDepartment.dto';
import { UpdateLocationDto } from './updateDtos/updateLocation.dto';
import { UpdateTopicDto } from './updateDtos/updateTopic.dto';
import { TypeService } from 'src/type/type.service';
import { DisabilityStatus } from 'src/entities/disabilityStatus.entity';
import { TopicStatus } from 'src/entities/topicStatus.entity';
import { CreateAccessDto } from './createDtos/createAccess.dto';
import { Access } from 'src/entities/access.entity';
import { CreateProfileDto } from './createDtos/createProfile.dto';
import { Profile } from 'src/entities/profile.entity';
import { ProfileAccess } from 'src/entities/profileAccess.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AbmService {

  constructor(
    private readonly typeService: TypeService,
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(Disability)
    private readonly disabilityRepository: Repository<Disability>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(PoliticalDivision)
    private readonly politicalDivisionRepository: Repository<PoliticalDivision>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    @InjectRepository(DisabilityStatus)
    private readonly disabilityStatusRepository: Repository<DisabilityStatus>,
    @InjectRepository(TopicStatus)
    private readonly topicStatusRepository: Repository<TopicStatus>,
    @InjectRepository(Access)
    private readonly accessRepository: Repository<Access>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(ProfileAccess)
    private readonly profileAccessRepository: Repository<ProfileAccess>,
    @InjectRepository(User)
    private readonly userepository: Repository<User>,
  ){}

  async createAccess(createAccessDto: CreateAccessDto){
    const access = this.accessRepository.create(createAccessDto)
    
    let finalAccess
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalAccess = await transaction.save(access)
      } catch (error) {
        throw new Error(error);
      }
    })
    return finalAccess
  }

  async createProfile(createProfileDto: CreateProfileDto, userId: number){

    const user = await this.userepository.findOne({
      relations: [
        'userProfile',
        'userProfile.profile',
        'userProfile.profile.profileAccess',
        'userProfile.profile.profileAccess.access', 
      ],
      where: {id: userId}
    })

    let access = []
    for (const userProfile of user.userProfile) {
      for (const profileAccess of userProfile.profile.profileAccess) {
        access.push(profileAccess.access.name)
      }
    }


    const profile = this.profileRepository.create(createProfileDto)

    // for (const access of createProfileDto.access) {
    //   const accessExist = await this.accessRepository.findOne({
    //     where: {
    //       code: access.code
    //     }
    //   })

    //   if(!accessExist){
    //     throw new NotFoundException('No existe un acceso asociado al código '+ access.code)
    //   }

    //   const profileAccess = this.profileAccessRepository.create({
    //     profile: profile,
    //     access: access
    //   })

    //   let finalProfileAccess
    //   await this.entityManager.transaction(async (transaction) => {
    //     try {
    //       finalProfileAccess = await transaction.save(profileAccess)
    //     } catch (error) {
    //       throw new Error(error);
    //     }
    //   })
    // }

    let finalProfile
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalProfile = await transaction.save(profile)
      } catch (error) {
        throw new Error(error);
      }
    })
    return finalProfile
  }

  async findAllAccess(){

    return await this.accessRepository.find()
  }

  async createDisability(createDisabilityDto: CreateDisabilityDto) {
    const disabilityStatusActivo = await this.typeService.findTypeByCode('DSActivo');
    const disability = this.disabilityRepository.create(createDisabilityDto)
    const disabilityStatus = this.disabilityStatusRepository.create({
      disabilityStatusType: disabilityStatusActivo,
    });

    disability.disabilityStatus = [disabilityStatus]
    
    let finalDisability
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalDisability = await transaction.save(disability)
      } catch (error) {
        throw new Error(error);
      }
    })
    return finalDisability
  }

  async createLocation(createLocationDto: CreateLocationDto) {
    // const department = await this.departmentRepository.findOne({where: { id: createLocationDto.departmentId.id}})
    const location = this.locationRepository.create(createLocationDto)

    // location.department = department    

    let finalLocation
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalLocation = await transaction.save(location)
      } catch (error) {
        throw new Error(error);
      }
    })
    return finalLocation
  }

  async createDepartment(createDepartmentDto: CreateDepartmentDto) {
    // const politicalDivision = await this.politicalDivisionRepository.findOne({where: { id: createDepartmentDto.politicalDivisionId.id}})
    const department = this.departmentRepository.create(createDepartmentDto)

    // department.politicalDivision = politicalDivision
    
    let finalDepartment
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalDepartment = await transaction.save(department)
      } catch (error) {
        throw new Error(error);
      }
    })
    return finalDepartment
  }
  
  async createPoliticalDivision(createPoliticalDivisionDto: CreatePoliticalDivisionDto){
    const politicalDivision = this.politicalDivisionRepository.create(createPoliticalDivisionDto)
    
    let finalPoliticalDivision
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalPoliticalDivision = await transaction.save(politicalDivision)
      } catch (error) {
        throw new Error(error);
      }
    })
    return finalPoliticalDivision
  }

  async createTopic(createTopicDto: CreateTopicDto){
    const topicStatusActivo = await this.typeService.findTypeByCode('DSActivo');
    const topic = this.topicRepository.create(createTopicDto)
    const topicStatus = this.topicStatusRepository.create({
      topicStatusType: topicStatusActivo,
    });

    topic.topicStatus = [topicStatus]
    
    let finalTopic
    await this.entityManager.transaction(async (transaction) => {
      try {
        finalTopic = await transaction.save(topic)
      } catch (error) {
        throw new Error(error);
      }
    })
    return finalTopic
  }

  async findAllDisabilities(){
    const disabilityStatusActivo = await this.typeService.findTypeByCode('DSActivo');

    const disabilities = await this.disabilityRepository.find({
      relations: ['disabilityStatus', 'disabilityStatus.disabilityStatusType'],
      where: {
        disabilityStatus: {
          disabilityStatusType: disabilityStatusActivo
        }
      }
    })   
    return disabilities
  }
  async findAllPoliticalDivision(){
    return await this.politicalDivisionRepository.find()   
  }
  async findAllDepartments(){
    return await this.departmentRepository.find({
      relations: ['politicalDivision'],
    })   
  }
  async findAllLocations(){
    return await this.locationRepository.find({
      relations: ['department'],
    })   
  }
  async findAllTopics(){
    const topicStatusActivo = await this.typeService.findTypeByCode('TSACtivo');

    const topics = await this.topicRepository.find({
      relations: ['topicStatus', 'topicStatus.topicStatusType'],
      where: {
        topicStatus: {
          topicStatusType: topicStatusActivo
        }
      }
    }) 
    
    return topics
  }

  async updateDisability(updateDisabilityDto: UpdateDisabilityDto) {
    const disability = await this.disabilityRepository.findOne({where: {id: updateDisabilityDto.id}})
    if(!disability){
      return new BadRequestException('No existe una discapacidad con el id: ' + updateDisabilityDto.id)
    }
    const disabilityToUpdate = await this.disabilityRepository.preload({id: updateDisabilityDto.id, ...updateDisabilityDto})
    let disabilityFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        console.log(transaction)
        disabilityFinal = await transaction.save(disabilityToUpdate)
      } catch (error) {
        throw new Error(error);
      }
    })
    return disabilityFinal
  }
  async updatePoliticalDivision(updatePoliticalDivisionDto: UpdatePoliticalDivisionDto) {
    const politicalDivision = await this.politicalDivisionRepository.findOne({where: {id: updatePoliticalDivisionDto.id}})
    if(!politicalDivision){
      return new BadRequestException('No existe una provincia con el id: ' + updatePoliticalDivisionDto.id)
    }
    const politicalDivisionToUpdate = await this.politicalDivisionRepository.preload({id: updatePoliticalDivisionDto.id, ...updatePoliticalDivisionDto})
    let politicalDivisionFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        console.log(transaction)
        politicalDivisionFinal = await transaction.save(politicalDivisionToUpdate)
      } catch (error) {
        throw new Error(error);
      }
    })
    return politicalDivisionFinal
  }
  async updateDepartment(updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.departmentRepository.findOne({where: {id: updateDepartmentDto.id}})
    if(!department){
      return new BadRequestException('No existe un departamento con el id: ' + updateDepartmentDto.id)
    }
    const departmentToUpdate = await this.departmentRepository.preload({id: updateDepartmentDto.id, ...updateDepartmentDto})
    let departmentFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        console.log(transaction)
        departmentFinal = await transaction.save(departmentToUpdate)
      } catch (error) {
        throw new Error(error);
      }
    })
    return departmentFinal
  }
  async updateLocation(updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.findOne({where: {id: updateLocationDto.id}})
    if(!location){
      return new BadRequestException('No existe un distrito con el id: ' + updateLocationDto.id)
    }
    const locationToUpdate = await this.locationRepository.preload({id: updateLocationDto.id, ...updateLocationDto})
    let locationFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        console.log(transaction)
        locationFinal = await transaction.save(locationToUpdate)
      } catch (error) {
        throw new Error(error);
      }
    })
    return locationFinal
  }
  async updateTopic(updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicRepository.findOne({where: {id: updateTopicDto.id}})
    if(!topic){
      return new BadRequestException('No existe un tema con el id: ' + updateTopicDto.id)
    }
    const topicToUpdate = await this.locationRepository.preload({id: updateTopicDto.id, ...updateTopicDto})
    let topicFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        console.log(transaction)
        topicFinal = await transaction.save(topic)
      } catch (error) {
        throw new Error(error);
      }
    })
    return topicFinal
  }


}
