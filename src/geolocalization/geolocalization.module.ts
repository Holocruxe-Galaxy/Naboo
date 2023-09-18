import { Module } from '@nestjs/common';
import { GeolocalizationController } from './geolocalization.controller';
import { GeolocalizationService } from './geolocalization.service';

@Module({
  controllers: [GeolocalizationController],
  providers: [GeolocalizationService],
})
export class GeolocalizationModule {}
