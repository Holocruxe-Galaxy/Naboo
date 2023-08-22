import { Module } from '@nestjs/common';
import { FleteController } from './flete.controller';
import { FleteService } from './flete.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Flete, FleteSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Flete.name,
        schema: FleteSchema,
      },
    ]),
    ConfigModule,
    HttpModule,
  ],
  controllers: [FleteController],
  exports: [FleteService],
  providers: [FleteService],
})
export class FleteModule {}
