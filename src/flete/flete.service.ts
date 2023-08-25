import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { /*FexFlete, */ FleteSolicitude } from './flete.interface';
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
        acceso: flete.acceso,
        dir_origen: flete.dir_origen,
        dir_destino: flete.dir_destino,
        des_lat: flete.des_lat,
        des_lng: flete.des_lng,
        des_carga: flete.des_carga,
        rec_nom: flete.rec_nom,
        rec_tel: flete.rec_tel,
        vehiculo: flete.vehiculo,
        reg_origen: flete.reg_origen,
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

  /*  async obtenerFletesDeEmpresaPorAccKey(
    access_key: string,
  ): Promise<FexFlete[]> {
    const fletes = await this.fleteModel
      .find({ acceso: access_key })
      .select('-_id servicio')
      .exec();

    const updatedFletes = fletes.map(
      async (flete: Partial<Flete>): Promise<FexFlete> => {
        const getFlete = (
          await this.httpService.axiosRef.get(
            `${this.configService.get<string>(
              'FEX_URL',
            )}/flete/estado?acceso=${access_key}&servicio=${flete.servicio}`,
          )
        ).data;
        return getFlete;
      },
    );

    const promiseFletes = await Promise.all(updatedFletes);

    console.log(promiseFletes);
    return promiseFletes;
  }
 */
  private async actualizarFletes(
    servicios: Partial<Flete[]>,
    access_key: string,
  ) {
    try {
      const fletes = servicios.map(async (flete: Partial<Flete>) => {
        const fleteInfo = (
          await this.httpService.axiosRef.get(
            `${this.configService.get<string>(
              'FEX_URL',
            )}/flete/estado?acceso=${access_key}&servicio=${flete.servicio}`,
          )
        ).data;
        return await this.fleteModel.updateOne(
          { servicio: flete.servicio },
          {
            estado: fleteInfo.resultado.estado,
            descripcion: fleteInfo.resultado.descripcion,
          },
        );
      });
      await Promise.all(fletes);
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async obtenerFletesDeEmpresaPorAccKeyTest(
    access_key: string,
  ): Promise<Flete[]> {
    const fletesServicios = await this.fleteModel
      .find({ acceso: access_key })
      .select('-_id servicio')
      .exec();

    await this.actualizarFletes(fletesServicios, access_key);

    const fletes = await this.fleteModel
      .find({ acceso: access_key })
      .select('-_id -__v -acceso')
      .exec();
    return fletes;
  }
}
