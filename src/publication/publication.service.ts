import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Publication } from 'src/entities/publication.entity';
import { PublicationStatus } from 'src/entities/publicationStatus.entity';
import { TypeService } from 'src/type/type.service';
import { ImprovePublicationDto } from './dto/improve-publication-dto';
import { PublicationPosition } from 'src/entities/publicationPosition.entity';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(PublicationStatus)
    private readonly publicationStatusRepository: Repository<PublicationStatus>,
    @InjectRepository(PublicationPosition)
    private readonly publicationPositionRepository: Repository<PublicationPosition>,
    private readonly entityManager: EntityManager,
    private readonly typeService: TypeService,
  ) {}

  async createPublication(createPublicationDto: CreatePublicationDto) {
    const publicationStatusActivo = await this.typeService.findTypeByCode(
      'PSTActivo',
    );

    const publication = this.publicationRepository.create(createPublicationDto);

    const publicationStatus = this.publicationStatusRepository.create({
      publicationStatusType: publicationStatusActivo,
    });

    publication.publicationStatus = [publicationStatus];

    let publicationFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        publicationFinal = await transaction.save(publication);
      } catch (error) {
        throw new Error(error);
      }
    });

    return publicationFinal;
  }

  async findAll() {
    const publicationStatusActivo = await this.typeService.findTypeByCode(
      'PSTActivo',
    );
    const publications = await this.publicationRepository.find({
      relations: [
        'publicationStatus',
        'publicationStatus.publicationStatusType',
        'publicationStatus.publicationStatusReasonType',
        'donation',
        'job',
        'job.offerType',
        'service',
        'publicationType',
        'location',
        'location.department',
        'location.department.politicalDivision',
        'publicationDisability',
        'publicationDisability.disability',
        'publicationPosition',
        'publicationPosition.position',
      ],
      where: {
        publicationStatus: {
          publicationStatusType: publicationStatusActivo,
        },
      },
    });
    if (publications.length === 0) throw new Error('No hay publicaciones.');
    return publications;
  }

  async findAllByAdmin() {
    const publications = await this.publicationRepository.find({
      relations: [
        'publicationStatus',
        'publicationStatus.publicationStatusType',
        'publicationStatus.publicationStatusReasonType',
        'donation',
        'job',
        'job.offerType',
        'service',
        'publicationType',
        'location',
        'location.department',
        'location.department.politicalDivision',
        'publicationDisability',
        'publicationDisability.disability',
      ],
    });
    if (publications.length === 0) throw new Error('No hay publicaciones.');
    return publications;
  }

  async findAllByUser(id: number) {
    const publications = await this.publicationRepository.find({
      relations: [
        'publicationStatus',
        'publicationStatus.publicationStatusType',
        'publicationStatus.publicationStatusReasonType',
        'donation',
        'job',
        'job.offerType',
        'service',
        'publicationType',
        'user',
        'publicationDisability',
        'publicationDisability.disability',
      ],
      where: {
        user: {
          id: id,
        },
      },
    });

    return publications;
  }

  async findOne(id: number) {
    const publicationStatusActivo = await this.typeService.findTypeByCode(
      'PSTActivo',
    );

    const publication = await this.publicationRepository.findOne({
      relations: [
        'publicationType',
        'user',
        'user.individualPerson',
        'user.legalPerson',
        'service',
        'donation',
        'job',
        'location',
        'location.department',
        'location.department.politicalDivision',
        'publicationDisability',
        'publicationDisability.disability',
        'images',
      ],
      where: {
        id: id,
        publicationStatus: {
          publicationStatusType: publicationStatusActivo,
        },
      },
    });

    return publication;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const publication = await this.publicationRepository.preload({
      id,
      ...updatePublicationDto,
    });

    let publicationFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        publicationFinal = await transaction.save(publication);
      } catch (error) {
        throw new Error(error);
      }
    });

    return publicationFinal;
  }

  async remove(id: number) {
    const publication = await this.publicationRepository.findOne({
      relations: [
        'publicationStatus',
        'publicationStatus.publicationStatusType',
        'publicationStatus.publicationStatusReasonType',
        'donation',
        'job',
        'job.offerType',
        'service',
        'publicationType',
        'user',
        'publicationDisability',
        'publicationDisability.disability',
      ],
      where: { id },
    });

    if (!publication) {
      return new NotFoundException('No existe una publicación con id = ' + id);
    }

    const publicationStatusInactivo = await this.typeService.findTypeByCode(
      'PSTInactivo',
    );

    const publicationStatus = this.publicationStatusRepository.create({
      publicationStatusType: publicationStatusInactivo,
    });

    publication.publicationStatus.push(publicationStatus);

    let publicationFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        publicationFinal = await transaction.save(publication);
      } catch (error) {
        throw new Error(error);
      }
    });

    return publicationFinal;
  }

  async improvePublication(improvePublicationDto: ImprovePublicationDto) {
    const publication = this.publicationPositionRepository.create({
      position: {
        id: improvePublicationDto.position,
      },
      publication: {
        id: improvePublicationDto.publication,
      },
    });

    let publicationFinal;
    await this.entityManager.transaction(async (transaction) => {
      try {
        publicationFinal = await transaction.save(publication);
      } catch (error) {
        throw new Error(error);
      }
    });

    return improvePublicationDto;
  }
}
