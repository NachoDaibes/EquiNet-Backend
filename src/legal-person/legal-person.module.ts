import { Module } from '@nestjs/common';
import { LegalPersonService } from './legal-person.service';
import { LegalPersonController } from './legal-person.controller';

@Module({
  controllers: [LegalPersonController],
  providers: [LegalPersonService]
})
export class LegalPersonModule {}
