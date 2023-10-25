import { Type } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { AssignTypeDto } from 'src/common/assign-type.helper';
import { AssignDto } from 'src/common/assign.dto';

export class CreateReportReplyDto {
  
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  reportedAt: Date;

  @IsObject()
  @ValidateNested()
  @Type(() => AssignDto)
  @IsNotEmpty()
  user: AssignDto;

  @IsObject()
  @ValidateNested()
  @Type(() => AssignDto)
  @IsNotEmpty()
  reply: AssignDto;

  @IsObject()
  @ValidateNested()
  @Type(() => AssignTypeDto)
  @IsNotEmpty()
  reason: AssignTypeDto;
}