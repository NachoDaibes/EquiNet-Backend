import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { json, urlencoded } from 'express';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      abortOnError: false,
    });
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
      .setTitle('EquiNet')
      .setDescription('Codigo de EquiNet')
      .addBearerAuth(undefined, 'defaultBearerAuth')
      .addSecurityRequirements('defaultBearerAuth')
      .build();
    app.enableCors();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document, {
      useGlobalPrefix: true,
      swaggerOptions: {
        authAction: {
          defaultBearerAuth: {
            name: 'defaultBearerAuth',
            schema: {
              description: 'Default',
              type: 'http',
              in: 'header',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
            value: 'thisIsASampleBearerAuthToken123',
          },
        },
      },
    });

    app.use(compression());
    app.enableCors();

    await app.listen(process.env.PORT || 3000);
  } catch (err: any) {
    console.log(err); // <-- for example, ECONNREFUSED error
  }
}
bootstrap();
