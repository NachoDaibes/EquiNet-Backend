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
import { CreatePublicationByAdminDto } from './dto/create-publication-admin.dto';
import { UpdatePublicationByAdminDto } from './dto/update-admin.dto';

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
    const publicationStatusPendiente = await this.typeService.findTypeByCode(
      'PSTPendienteDeAutorizacion',
    );

    const publication = this.publicationRepository.create(createPublicationDto);

    const publicationStatus = this.publicationStatusRepository.create({
      publicationStatusType: publicationStatusPendiente,
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

  async createPublicationByAdmin(
    createPublicationByAdminDto: CreatePublicationByAdminDto,
  ) {
    const publication = this.publicationRepository.create(
      createPublicationByAdminDto,
    );

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

  async findAll(
    disabilityFilter?: string,
    politicalDivisionFilter?: string,
    departmentFilter?: string,
    locationFilter?: string,
    publicationTypeFilter?: string,
  ) {
    const publicationStatusActivo = await this.typeService.findTypeByCode(
      'PSTActivo',
    );
    let publications = await this.publicationRepository.find({
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
    });

    if (disabilityFilter) {
      publications = publications.filter((publication) =>
        publication.publicationDisability.some(
          (disability) => disability.disability?.name === disabilityFilter,
        ),
      );
    }
    if (politicalDivisionFilter) {
      publications = publications.filter(
        (publication) =>
          publication.location.department?.politicalDivision?.name ===
          politicalDivisionFilter,
      );
    }
    if (departmentFilter) {
      publications = publications.filter(
        (publication) =>
          publication.location.department?.name === departmentFilter,
      );
    }
    if (locationFilter) {
      publications = publications.filter(
        (publication) => publication.location.name === locationFilter,
      );
    }
    if (publicationTypeFilter) {
      publications = publications.filter(
        (publication) =>
          publication.publicationType.name === publicationTypeFilter,
      );
    }

    if (publications.length === 0) return [];

    const first = [];
    const second = [];
    const third = [];
    const fourth = [];
    const fifth = [];
    for (let i = 0; i <= publications.length - 1; i++) {
      if (publications[i].publicationPosition) {
        const publicationPosition = publications[i].publicationPosition;
        if (publicationPosition?.length) {
          const length = publicationPosition.length;
          if (length > 0) {
            const date = new Date();
            if (
              publicationPosition[length - 1].positionRegistrationDateTime <
                date &&
              publicationPosition[length - 1].positionExpirationDateTime > date
            ) {
              if (publicationPosition[length - 1].position.number === 1) {
                first.push(publications[i]);
                publications.splice(i, 1);
              }
              if (publicationPosition[length - 1].position.number === 2) {
                second.push(publications[i]);
                publications.splice(i, 1);
              }
              if (publicationPosition[length - 1].position.number === 3) {
                third.push(publications[i]);
                publications.splice(i, 1);
              }
              if (publicationPosition[length - 1].position.number === 4) {
                fourth.push(publications[i]);
                publications.splice(i, 1);
              }
              if (publicationPosition[length - 1].position.number === 5) {
                fifth.push(publications[i]);
                publications.splice(i, 1);
              }
            }
          }
        }
      }
    }
    publications = publications.sort((p1, p2) => Math.random() * 100 - 50);
    if (first.length > 0) {
      for (const p of first) {
        publications.splice(0, 0, p);
      }
    }
    if (second.length > 0) {
      let offset = 0;
      if (first.length > 0) offset = first.length - 1;
      for (const p of second) {
        publications.splice(1 + offset, 0, p);
      }
    }
    if (third.length > 0) {
      let offset = 0;
      if (second.length > 0) offset = second.length - 1;
      for (const p of third) {
        publications.splice(2 + offset, 0, p);
      }
    }
    if (fourth.length > 0) {
      let offset = 0;
      if (third.length > 0) offset = third.length - 1;
      for (const p of fourth) {
        publications.splice(3 + offset, 0, p);
      }
    }
    if (fifth.length > 0) {
      let offset = 0;
      if (fourth.length > 0) offset = fourth.length - 1;
      for (const p of fifth) {
        publications.splice(4 + offset, 0, p);
      }
    }

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
        'publicationPosition',
        'publicationPosition.position',
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
        'publicationPosition',
        'publicationPosition.position',
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
        'publicationStatus',
        'publicationStatus.publicationStatusType',
        'publicationStatus.publicationStatusReasonType',
      ],
      where: {
        id: id,
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

  async updateByAdmin(
    id: number,
    updatePublicationDto: UpdatePublicationByAdminDto,
  ) {
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
