import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FleteSolicitude } from './flete.interface';

@Injectable()
export class FleteService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async SolicitarFlete(flete: FleteSolicitude): Promise<boolean> {
    const newFlete = await this.httpService.axiosRef.post(
      this.configService.get<string>('FEX_URL'),
      flete,
    );
    throw new Error('Method not implemented');
  }
}
