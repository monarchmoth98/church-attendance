import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

function createSwaggerDocument(app: INestApplication) {
  return SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Church Attendance')
      .setDescription('A tool to track church Attendance over time')
      .setVersion('1.0')
      .build(),
  );
}

async function createApp() {
  const app = await NestFactory.create(AppModule);
  const document = createSwaggerDocument(app);
  SwaggerModule.setup('api', app, document);
  return app;
}

async function bootstrap() {
  const app = await createApp();
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
