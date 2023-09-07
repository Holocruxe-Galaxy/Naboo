import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { objHBLogin, objLogin, objStore } from 'src/store/dto/store.dto';
import { TokenPayload, accessVerifyResponse } from './login.interface';
import { JwtService } from '@nestjs/jwt';
import { StoreService } from 'src/store/store.service';
import { InjectModel } from '@nestjs/mongoose';
import { Login } from './schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name)
    @Inject(forwardRef(() => ConfigService))
    private readonly loginModel: Model<Login>,
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

  async HBRegister(user: objHBLogin): Promise<Login> {
    try {
      const dbUser = await this.loginModel
        .findOne({ username: user.username })
        .exec();
      if (dbUser) {
        throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
      }
      const pass = await bcrypt.hash(
        user.password,
        Number(this.configService.get<string>('BCRYPT_ROUNDS')),
      );
      user.password = pass;
      const newUser = await this.loginModel.create(user);
      return newUser;
    } catch (error) {
      throw new HttpException(error.mensaje, error.status);
    }
  }

  async HBLogin(user: objHBLogin): Promise<any> {
    try {
      const dbUser = await this.loginModel
        .findOne({ username: user.username })
        .exec();
      if (!dbUser) {
        throw new HttpException(
          'Nombre de usuario o contraseña incorrectos',
          HttpStatus.NOT_FOUND,
        );
      }
      if (!dbUser && (await bcrypt.compare(user.password, dbUser.password))) {
        throw new HttpException(
          'Nombre de usuario o contraseña incorrectos',
          HttpStatus.NOT_FOUND,
        );
      }
      const token = await this.crearToken({
        userId: dbUser._id,
        username: dbUser.username,
      });

      return { token, userId: dbUser._id };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  private async crearToken(user: TokenPayload): Promise<string> {
    if (!this.configService.get<string>('JWT_SECRET')) {
      throw new HttpException(
        'No fue posible crear el token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return await this.jwtService.signAsync(
      {
        userId: user.userId,
        username: user.username,
      } as TokenPayload,
      { secret: this.configService.get<string>('JWT_SECRET') },
    );
  }
}
