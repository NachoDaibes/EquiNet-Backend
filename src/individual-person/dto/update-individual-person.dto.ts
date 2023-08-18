import { PartialType } from '@nestjs/mapped-types';
import { CreateIndividualPersonDto } from './create-individual-person.dto';

export class UpdateIndividualPersonDto extends PartialType(CreateIndividualPersonDto) {}
