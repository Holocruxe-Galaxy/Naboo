import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class objConsult {
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
