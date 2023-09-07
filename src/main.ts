import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import * as handlebars from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /*  const configService = app.get(ConfigService);

  const LOCAL = configService.get<string>('LOCAL');
  const FRONTEND = configService.get<string>('FRONT_URL');
  
  if (LOCAL) {
    app.enableCors({
      origin: `${FRONTEND}`,
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: `*`,
      credentials: true,
    });
  } */

  app.use(cookieParser());

  app.enableCors({
    origin: `*`,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
    }),
  );

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('hbs');
  app.engine('hbs', handlebars.engine({ extname: 'hbs' }));

  app.enableCors({
    origin: '*', // Reemplaza esto con el origen de tu cliente
  });
  await app.listen(process.env.PORT);
}
bootstrap();
