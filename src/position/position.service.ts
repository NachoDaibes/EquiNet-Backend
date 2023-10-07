import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from 'src/entities/position.entity';
import { Repository } from 'typeorm';
import { TypeService } from 'src/type/type.service';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    private readonly typeService: TypeService,
  ) {}

  async findAll(type: string) {
    const publicationType = await this.typeService.findTypeByCode(type);
    const positions = await this.positionRepository.find({
      relations: ['publicationPosition', 'publicationType'],
      where: {
        publicationType: publicationType,
      },
    });
    return positions;
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
