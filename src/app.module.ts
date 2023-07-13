import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationModule } from './publication/publication.module';

@Module({
  imports: [PublicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
