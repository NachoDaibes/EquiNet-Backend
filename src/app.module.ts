import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationResolver } from './publication/publication.resolver';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [PublicationModule],
  controllers: [AppController],
  providers: [AppService, PublicationResolver],
})
export class AppModule {}
