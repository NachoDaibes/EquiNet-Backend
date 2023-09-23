import { Injectable } from '@nestjs/common';
import { CreateDisabilityDto } from './dto/create-disability.dto';
import { UpdateDisabilityDto } from './dto/update-disability.dto';
import { Repository } from 'typeorm';
import { Disability } from 'src/entities/disability.entity';
import { TypeService } from 'src/type/type.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DisabilityService {
  constructor(
    @InjectRepository(Disability)
    private readonly disabilityRepository: Repository<Disability>,
    private readonly typeService: TypeService,
  ) {}
  create(createDisabilityDto: CreateDisabilityDto) {
    return 'This action adds a new disability';
  }

  async findAll() {
    const type = await this.typeService.findTypeByCode('DSActivo');
    if (type) {
      const disabilities = await this.disabilityRepository
        .createQueryBuilder('Disability')
        .select(['Disability.id', 'Disability.name'])
        .leftJoin('Disability.disabilityStatus', 'DisabilityStatus')
        .leftJoin(
          'DisabilityStatus.disabilityStatusType',
          'DisabilityStatusType',
        )
        .where('DisabilityStatusType.code = :code', { code: type.code })
        .getMany();
      return disabilities;
    } else {
      throw new Error('No se entontro el type.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} disability`;
  }

  update(id: number, updateDisabilityDto: UpdateDisabilityDto) {
    return `This action updates a #${id} disability`;
  }

  remove(id: number) {
    return `This action removes a #${id} disability`;
  }
}
