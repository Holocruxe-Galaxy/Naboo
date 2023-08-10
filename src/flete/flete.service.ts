import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FleteConsulta,
  FleteConsultaRespuesta,
  FleteSolicitude,
} from './flete.interface';
import { Flete } from './schema/flete.schema';
import { Model } from 'mongoose';

@Injectable()
export class FleteService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private readonly fleteModel: Model<Flete>,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async solicitarFlete(flete: FleteSolicitude): Promise<Flete> {
    try {
      const newFlete = (
        await this.httpService.axiosRef.post(
          `${this.configService.get<string>('FEX_URL')}/flete/solicitar`,
          flete,
        )
      ).data;
      await this.fleteModel.create(newFlete);
      return newFlete;
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }
  async consultarCosto(
    consulta: FleteConsulta,
  ): Promise<FleteConsultaRespuesta> {
    // ? consulta.vehiculo = this.obtenerVehiculo(consulta.peso);
    const cost = await this.httpService.axiosRef.post(
      `${this.configService.get<string>('FEX_URL')}/flete/cotizar`,
      consulta,
    );
    if (!cost.status) {
      throw new HttpException('Algo salió mal', HttpStatus.BAD_REQUEST);
    }
    return cost.data as FleteConsultaRespuesta;
  }

  // ? private obtenerVehiculo(peso: number): number {
  //   Logica necesaria a aplicar: Que pasa con el volumen del vehiculo, las preferencias del que envia el producto, y la necesidad y/o fragilidad del producto
  //   if (peso <= 4) return 1;
  //   if (peso <= 50) return 2;
  //   if (peso <= 500) return 3;
  //   if (peso <= 700) return 5;
  //   if (peso <= 1000) return 7;
  //   if (peso <= 1000) return 8;
  // }
}
