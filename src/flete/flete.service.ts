import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FleteSolicitude } from './flete.interface';
import { FleteDto } from './dto/flete.dto';

@Injectable()
export class FleteService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async SolicitarFlete(flete: FleteDto): Promise<boolean> {
    console.log(flete);
    const newFlete = await this.httpService.axiosRef.post(
      `${this.configService.get<string>('FEX_URL')}/flete/solicitar`,
      flete as FleteSolicitude,
    );
    console.log(newFlete.data);
    return true;
  }
}
