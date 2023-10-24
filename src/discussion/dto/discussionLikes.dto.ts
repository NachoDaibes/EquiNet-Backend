import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { AssignDto } from 'src/common/assign.dto';

export class DiscussionLikesDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsObject()
  @ValidateNested()
  @Type(() => AssignDto)
  @IsNotEmpty()
  discussion: AssignDto;
}
