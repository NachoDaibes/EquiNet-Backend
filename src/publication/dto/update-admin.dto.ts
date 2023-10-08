import { PartialType } from '@nestjs/swagger';
import { CreatePublicationByAdminDto } from './create-publication-admin.dto';

export class UpdatePublicationByAdminDto extends PartialType(CreatePublicationByAdminDto) {}
