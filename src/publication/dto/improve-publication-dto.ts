import { IsNotEmpty } from 'class-validator';

export class ImprovePublicationDto {
  @IsNotEmpty()
  publication: number;

  @IsNotEmpty()
  position: number;
}
