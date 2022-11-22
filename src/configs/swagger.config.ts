import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Quotastic API')
  .setDescription(
    `
    This is a Backend API for a quote sharing application.
  `,
  )
  .setVersion('1.0')
  .addTag('auth')
  .addTag('users')
  .addTag('quotes')
  .addBearerAuth()
  .build();
