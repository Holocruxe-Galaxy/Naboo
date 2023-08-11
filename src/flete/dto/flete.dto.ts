import { IsNumber, IsString } from 'class-validator';

export class FleteDto {
  @IsString()
  acceso: string;

  @IsString()
  ori_lat: number;

  @IsString()
  ori_lng: number;

  @IsString()
  dir_origen: string;

  @IsString()
  des_lat: number;

  @IsString()
  des_lng: number;

  @IsString()
  dir_destino: string;

  @IsString()
  des_carga: string;

  @IsString()
  rec_nom: string;

  @IsString()
  rec_tel: number;

  @IsString()
  vehiculo: number;

  @IsString()
  reg_origen: number;

  //   @IsNumber()
  //   extra?: string;

  //   @IsString()
  //   cupon: '';
}
