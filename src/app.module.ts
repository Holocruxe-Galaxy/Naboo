import {
  /* MiddlewareConsumer, */ Module /* NestModule */,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FleteModule } from './flete/flete.module';
import { LoginController } from './login/login.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DB_FEX_MONGO_ATLAS'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    HttpModule,
    FleteModule,
    LoginModule,
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService],
})
export class AppModule {} /* implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(*)
  }
} */
