import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from 'src/entities/type.entity';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async findTypeByCode(code: string) {
    return await this.typeRepository.findOne({
      where: {
        code: code,
      },
    });
  }
  create(createTypeDto: CreateTypeDto) {
    return 'This action adds a new type';
  }

  findAll() {
    return `This action returns all type`;
  }

  async findAllByTypeConfig(code: string) {
    return await this.typeRepository.find({
      where: {
        typeConfig: {
          code: code,
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
