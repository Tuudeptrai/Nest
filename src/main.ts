
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
 
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
  .setTitle('NestJs API document')
  .setDescription('All module')
  .setVersion('1.0')
  .addBearerAuth(
    {
    type: 'http',
    scheme: 'Bearer',
    bearerFormat: 'JWT',
    in: 'header',
    },
    'token',
    )
    .addSecurityRequirements('token')
    
  // .addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
    persistAuthorization: true,
      }
    }
    );
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();

