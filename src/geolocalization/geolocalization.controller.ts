import { Controller, Get, Query } from '@nestjs/common';
import { GeolocalizationService } from './geolocalization.service';

@Controller('geolocalization')
export class GeolocalizationController {
  constructor(private readonly geoServices: GeolocalizationService) {}

  @Get('/')
  localization(@Query('address') address: string) {
    return this.geoServices.getPosition(address);
  }
}
