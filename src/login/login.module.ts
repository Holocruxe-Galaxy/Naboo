import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { StoreModule } from 'src/store/store.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, LoginSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Login.name,
        schema: LoginSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      /* secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_SECRET_EXPIRES_IN } */
    }),
    ConfigModule,
    HttpModule,
    StoreModule,
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
