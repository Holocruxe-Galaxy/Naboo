import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class FleteDto {
  @IsString()
  acceso: string;

  @IsString()
  wc_order: string;

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

  @IsOptional()
  programado: string;

  @IsOptional()
  extra: string;

  @IsString()
  fecha: string;

  @IsOptional()
  cupon: string;
  //   @IsString()
  //   cupon: '';
}
export class ObjConsult {
  @IsNotEmpty()
  @IsString()
  acceso: string;

  @IsNotEmpty()
  @IsNumber()
  ori_lat: number;

  @IsNotEmpty()
  @IsNumber()
  ori_lng: number;

  @IsNotEmpty()
  @IsNumber()
  des_lat: number;

  @IsNotEmpty()
  @IsString()
  rec_nom: string;

  @IsNotEmpty()
  @IsString()
  rec_tel: string;

  @IsNotEmpty()
  @IsNumber()
  des_lng: number;

  @IsNotEmpty()
  @IsNumber()
  vehiculo: number;

  @IsNotEmpty()
  @IsNumber()
  reg_origen: number;
}
