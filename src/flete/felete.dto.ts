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
  @IsNumber()
  des_lng: number;

  @IsNotEmpty()
  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsNumber()
  reg_origen: number;
}
