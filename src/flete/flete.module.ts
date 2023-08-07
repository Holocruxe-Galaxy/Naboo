import { Module } from '@nestjs/common';
import { FleteController } from './flete.controller';
import { FleteService } from './flete.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [FleteController],
  providers: [FleteService],
})
export class FleteModule {}
