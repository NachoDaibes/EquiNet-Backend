import { Injectable } from '@nestjs/common';
import { CreateTypeConfigDto } from './dto/create-type-config.dto';
import { UpdateTypeConfigDto } from './dto/update-type-config.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { TypeConfig } from 'src/entities/typeConfig.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class TypeConfigService {
  constructor(
    @InjectRepository(TypeConfig)
    private readonly typeConfigRepository: Repository<TypeConfig>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ){}


  async create(createTypeConfigDto: CreateTypeConfigDto) {
    const typeConfig = this.typeConfigRepository.create(createTypeConfigDto)
    
    await this.entityManager.transaction(async (transaction) => {
      try {
        await transaction.save(typeConfig)
      } catch (error) {
        throw new Error(error);
      }
    })
  }

  async findAll() {
    return await this.typeConfigRepository.find({})
  }

  async findOne(code: string) {
    return await this.typeConfigRepository.findOne({where: {code: code}})
  }

  update(id: number, updateTypeConfigDto: UpdateTypeConfigDto) {
    return `This action updates a #${id} typeConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeConfig`;
  }
}
