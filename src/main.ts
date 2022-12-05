import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.use(helmet());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  console.log('Listening on port ' + port);
  await app.listen(port);
}
bootstrap();
