import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Hexagonal Architecture API')
    .setDescription(
      'API documentation for NestJS application with hexagonal architecture',
    )
    .setVersion('1.0')
    .addTag('company', 'Company management endpoints')
    .addTag('transfer', 'Transfer management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
