import { PartialType } from '@nestjs/mapped-types';
import { CreateLegalPersonDto } from './create-legal-person.dto';

export class UpdateLegalPersonDto extends PartialType(CreateLegalPersonDto) {}
