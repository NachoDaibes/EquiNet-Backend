import { PartialType } from '@nestjs/swagger';
import { CreateTypeConfigDto } from './create-type-config.dto';

export class UpdateTypeConfigDto extends PartialType(CreateTypeConfigDto) {}
