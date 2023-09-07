import { Module } from '@nestjs/common';
import { FexService } from './fex.service';
import { FexController } from './fex.controller';
import { FleteModule } from 'src/flete/flete.module';
import { StoreModule } from 'src/store/store.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [FleteModule, StoreModule, HttpModule, ConfigModule],
  providers: [FexService],
  exports: [FexService],
  controllers: [FexController],
})
export class FexModule {}
