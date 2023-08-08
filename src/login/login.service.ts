import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { objLogin } from 'src/store/dto/store.dto';
import { accessVerifyResponse } from './login.interface';

@Injectable()
export class LoginService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}
  /**
   * En esta ruta se debe hacer la consulta a la api de FEX preguntando por si el accessKey es valido
   * Recibe un "user" que refiere al login
   * @param user
   * retorna true en caso de exito y un 401 y un mensaje de "unauthorized" en caso de no ser correcto
   * @returns
   */
  async Login(user: objLogin): Promise<boolean> {
    /*     try { */
    const verify = (
      await this.httpService.axiosRef.post<accessVerifyResponse>(
        `${this.configService.get<string>('FEX_URL')}/index`,
        { acceso: user.accessKey },
      )
    ).data;
    if (!verify.estatus) {
      throw new HttpException('unauthorize', HttpStatus.UNAUTHORIZED);
    }
    return true;
    /*     } catch (error) {
      throw new HttpException(error.message, error.status);
    } */
  }
}
