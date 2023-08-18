import { Module } from '@nestjs/common';
import { IndividualPersonService } from './individual-person.service';
import { IndividualPersonController } from './individual-person.controller';

@Module({
  controllers: [IndividualPersonController],
  providers: [IndividualPersonService]
})
export class IndividualPersonModule {}
