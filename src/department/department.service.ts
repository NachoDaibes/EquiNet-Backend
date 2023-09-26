import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from 'src/entities/department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    const departmentExist = await this.departmentRepository.findOne({
      where: {
        name: createDepartmentDto.name,
      },
    });

    if (departmentExist) {
      return new BadRequestException(
        'Ya existe una provincia con el nombre ingresado',
      );
    }

    const department = this.departmentRepository.create(createDepartmentDto);
    let departmentFinal;

    await this.entityManager.transaction(async (transaction) => {
      try {
        departmentFinal = await transaction.save(department);
      } catch (error) {
        throw new Error(error);
      }
    });

    return departmentFinal;
  }

  async findAll() {
    const departments = await this.departmentRepository
      .createQueryBuilder('Department')
      .select([
        'Department.id',
        'Department.name',
        'PoliticaDivision.id',
        'PoliticaDivision.name',
      ])
      .leftJoin('Department.politicalDivision', 'PoliticaDivision')
      .getMany();
    return departments;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
