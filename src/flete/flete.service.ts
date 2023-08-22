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
import { Flete } from './schema';
import { Model } from 'mongoose';
import { FleteDto } from './dto/flete.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FleteService {
  constructor(
    @InjectModel(Flete.name)
    @Inject(forwardRef(() => ConfigService))
    private readonly fleteModel: Model<Flete>,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async solicitarFlete(flete: FleteDto): Promise<Flete> {
    try {
      const newFlete = (
        await this.httpService.axiosRef.post(
          `${this.configService.get<string>('FEX_URL')}/flete/solicitar`,
          flete as FleteSolicitude,
        )
      ).data;
      const finalFlete = {
        ...flete,
        estatus: newFlete.estatus,
        servicio: newFlete.resultado.servicio,
        tipo: newFlete.resultado.tipo,
        distancia: newFlete.resultado.distancia,
        total: newFlete.resultado.total,
      };
      await this.fleteModel.create(finalFlete);
      return newFlete;
    } catch (error) {
      console.log(error);
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

  async consultarFlete(ftid: string): Promise<Flete> {
    try {
      return this.fleteModel.findById(ftid);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // ? private adivinaAdivinadorQueCamionUsoHoy(transporte: Transporte) {
  // La logica que quiero aplicar acá: En base a la cantida de productos enviados por la empresa, y el "volumen" de las cosas que tiene preconfiguradas el
  // vendedor (si tiene un aproximado para los productos)
  // }

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
