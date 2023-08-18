import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationModule } from './publication/publication.module';
import { UserModule } from './user/user.module';
import { IndividualPersonModule } from './individual-person/individual-person.module';
import { LegalPersonModule } from './legal-person/legal-person.module';

@Module({
  imports: [PublicationModule, UserModule, IndividualPersonModule, LegalPersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
