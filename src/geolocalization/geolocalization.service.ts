import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeolocalizationService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getPosition(address: string): Promise<any> {
    return (
      await this.httpService.axiosRef.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.configService.get<string>(
          'GMAPS_API_KEY',
        )}`,
      )
    ).data;
  }
}
