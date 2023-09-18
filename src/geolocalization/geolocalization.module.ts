import { Module } from '@nestjs/common';
import { GeolocalizationController } from './geolocalization.controller';
import { GeolocalizationService } from './geolocalization.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [GeolocalizationController],
  providers: [GeolocalizationService],
})
export class GeolocalizationModule {}
