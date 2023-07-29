import { Module } from '@nestjs/common';
import { FleteController } from './flete.controller';
import { FleteService } from './flete.service';

@Module({
  controllers: [FleteController],
  providers: [FleteService]
})
export class FleteModule {}
