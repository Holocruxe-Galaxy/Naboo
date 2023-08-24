import { HttpService } from '@nestjs/axios';
import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FleteSolicitude } from './flete.interface';
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
      console.log(newFlete);
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

  async consultarFlete(ftid: string): Promise<Flete> {
    try {
      return this.fleteModel.findById(ftid);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async obtenerFletesDeEmpresaPorAccKey(access_key: string): Promise<Flete[]> {
    return this.fleteModel
      .find({ acceso: access_key })
      .select(
        '-_id estatus servicio tipo distancia total rec_rel rec_nom dir_destino',
      )
      .exec();
  }
}
