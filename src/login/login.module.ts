import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
