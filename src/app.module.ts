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
import { LoginModule } from './login/login.module';
import { StoreModule } from './store/store.module';
import { RouteGuard } from './login/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { FexController } from './fex/fex.controller';
import { DocsController } from './docs/docs.controller';
import { DocsService } from './docs/docs.service';
import { FexService } from './fex/fex.service';
import { FexModule } from './fex/fex.module';
import { DocsModule } from './docs/docs.module';
import { GeolocalizationController } from './geolocalization/geolocalization.controller';
import { GeolocalizationService } from './geolocalization/geolocalization.service';
import { GeolocalizationModule } from './geolocalization/geolocalization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
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
    StoreModule,
    FexModule,
    DocsModule,
    GeolocalizationModule,
  ],
  controllers: [AppController, LoginController, FexController, DocsController, GeolocalizationController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: RouteGuard },
    DocsService,
    FexService,
    GeolocalizationService,
  ],
})
export class AppModule {} /* implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(*)
  }
} */
