import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Quotastic API')
  .setDescription('The Quotastic API description')
  .setVersion('1.0')
  .addTag('auth')
  .addTag('users')
  .addTag('quotes')
  .addBearerAuth()
  .build();
