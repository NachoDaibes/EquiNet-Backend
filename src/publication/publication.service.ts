import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Publication } from 'src/entities/publication.entity';
import { PublicationStatus } from 'src/entities/publicationStatus.entity';
import { TypeService } from 'src/type/type.service';

@Injectable()
export class PublicationService {

  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(PublicationStatus)
    private readonly publicationStatusRepository: Repository<PublicationStatus>,
    private readonly entityManager: EntityManager,
    private readonly typeService: TypeService
  ){}

  async createPublication(createPublicationDto: CreatePublicationDto) {

    const publicationStatusActivo = await this.typeService.findTypeByCode('PSTActivo')
    
    const publication = this.publicationRepository.create(createPublicationDto)
    
    const publicationStatus = this.publicationStatusRepository.create({
      publicationStatusType: publicationStatusActivo
    })


    publication.publicationStatus = [publicationStatus]

    let publicationFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        publicationFinal = await transaction.save(publication)
      } catch (error) {
        throw new Error(error);
      }
    })

    return publicationFinal
  }

  async findAll() {
    const publicationStatusActivo = await this.typeService.findTypeByCode('PSTActivo')

    const publications = await this.publicationRepository.find({
      relations: ['publicationStatus', 'publicationStatus.publicationStatusType', 'publicationStatus.publicationStatusReasonType', 
      'donnation', 'job', 'job.offerType', 'service'],
      where: {
        publicationStatus: {
          publicationStatusType: publicationStatusActivo
        }
      }
    })
  
    return publications
  }

  findOne(id: number) {
    return `This action returns a #${id} publication`;
  }

  update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  async remove(id: number) {
    const publication = await this.publicationRepository.findOne({where: {id}})

    if(!publication) {
      return new NotFoundException('No existe una publicación con id = ' + id)
    }

    const publicationStatusInactivo = await this.typeService.findTypeByCode('PSTInactivo')

    const publicationStatus = this.publicationStatusRepository.create({
      publicationStatusType: publicationStatusInactivo
    })

    publication.publicationStatus = [publicationStatus]

    let publicationFinal
    await this.entityManager.transaction(async (transaction) => {
      try {
        publicationFinal = await transaction.save(publication)
      } catch (error) {
        throw new Error(error);
      }
    })

    return publicationFinal
  }
}