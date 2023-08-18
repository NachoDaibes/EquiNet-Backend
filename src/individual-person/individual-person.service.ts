import { Injectable } from '@nestjs/common';
import { CreateIndividualPersonDto } from './dto/create-individual-person.dto';
import { UpdateIndividualPersonDto } from './dto/update-individual-person.dto';

@Injectable()
export class IndividualPersonService {
  create(createIndividualPersonDto: CreateIndividualPersonDto) {
    return 'This action adds a new individualPerson';
  }

  findAll() {
    return `This action returns all individualPerson`;
  }

  findOne(id: number) {
    return `This action returns a #${id} individualPerson`;
  }

  update(id: number, updateIndividualPersonDto: UpdateIndividualPersonDto) {
    return `This action updates a #${id} individualPerson`;
  }

  remove(id: number) {
    return `This action removes a #${id} individualPerson`;
  }
}
