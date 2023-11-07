import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateTopicDto } from '../createDtos/topic.dto';
import { CreateProfileDto } from '../createDtos/createProfile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
