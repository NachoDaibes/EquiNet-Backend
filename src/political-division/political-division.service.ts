import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePoliticalDivisionDto } from './dto/create-political-division.dto';
import { UpdatePoliticalDivisionDto } from './dto/update-political-division.dto';
import { PoliticalDivision } from 'src/entities/politicalDivision.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PoliticalDivisionService {
  constructor(
    @InjectRepository(PoliticalDivision)
    private readonly politicalDivisionRepository: Repository<PoliticalDivision>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createPoliticalDivisionDto: CreatePoliticalDivisionDto) {
    const politicalDivisionExist =
      await this.politicalDivisionRepository.findOne({
        where: {
          name: createPoliticalDivisionDto.name,
        },
      });

    if (politicalDivisionExist) {
      return new BadRequestException(
        'Ya existe una provincia con el nombre ingresado',
      );
    }

    const politicalDivision = this.politicalDivisionRepository.create({
      name: createPoliticalDivisionDto.name,
    });
    let politicalDivisionFinal;

    await this.entityManager.transaction(async (transaction) => {
      try {
        politicalDivisionFinal = await transaction.save(politicalDivision);
      } catch (error) {
        throw new Error(error);
      }
    });

    return politicalDivisionFinal;
  }

  async findAll() {
    const politicalDivisions = await this.politicalDivisionRepository
      .createQueryBuilder('PoliticalDivision')
      .select(['PoliticalDivision.id', 'PoliticalDivision.name'])
      .getMany();
    return politicalDivisions
  }

  findOne(id: number) {
    return `This action returns a #${id} politicalDivision`;
  }

  update(id: number, updatePoliticalDivisionDto: UpdatePoliticalDivisionDto) {
    return `This action updates a #${id} politicalDivision`;
  }

  remove(id: number) {
    return `This action removes a #${id} politicalDivision`;
  }
}
