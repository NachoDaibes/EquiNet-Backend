import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AssignDto } from 'src/common/assign.dto';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AssignDto)
  @IsNotEmpty()
  departmentId: AssignDto;
}
