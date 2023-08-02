import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { objLogin } from 'src/dto/user.dto';

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
    // const user = await this.httpService.axiosRef.post(<URLFex>,{}).data
    if (user.accessKey === 'alex' && user.country === 'Argentina') {
      return true;
    } else {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
