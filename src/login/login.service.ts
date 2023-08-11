import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { objLogin, objStore } from 'src/store/dto/store.dto';
import { /* TokenPayload,*/ accessVerifyResponse } from './login.interface';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from 'src/store/store.service';


@Injectable()
export class LoginService {
  constructor(
    @Inject(forwardRef(() => ConfigService))
    private configService: ConfigService,
    private readonly httpService: HttpService,
    private jwtService: JwtService,
    private storeService: StoreService,
  ) {}
  /**
   * En esta ruta se debe hacer la consulta a la api de FEX preguntando por si el accessKey es valido
   * Recibe un "user" que refiere al login
   * @param store
   * retorna true en caso de exito y un 401 y un mensaje de "unauthorized" en caso de no ser correcto
   * @returns
   */
  async Login(store: objLogin): Promise<boolean> {
    try {
      const verify = (
        await this.httpService.axiosRef.post<accessVerifyResponse>(
          `${this.configService.get<string>('FEX_URL')}/index`,
          { acceso: store.access_key },
        )
      ).data;
      if (!verify.estatus) {
        throw new UnauthorizedException();
      }
      // ?  const payload = {
      //   storeAccess: user.accessKey
      //     .slice(0, user.accessKey.length / 2)
      //     .split('')
      //     .reverse()
      //     .toString(),
      //   country: user.country,
      // };
      //  const token = this.crearToken(payload as TokenPayload);
      await this.storeService.createStore(store as objStore);
      return true;
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }

  // ? private async crearToken(store: TokenPayload): Promise<string> {
  //   if (!this.configService.get<string>('JWT_SECRET')) {
  //     throw new HttpException(
  //       'No fue posible crear el token',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  //   return await this.jwtService.signAsync({
  //     storeAccess: store.storeAccess,
  //     country: store.country,
  //   } as TokenPayload);
  // }
}
