import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class objLogin {
  @IsNotEmpty()
  @IsString()
  access_key: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

export class objStore {
  id: ObjectId;

  @IsNotEmpty()
  @IsString()
  access_key: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  address: string;

  @IsString()
  post_code: string;

  @IsString()
  store_name: string;

  @IsString()
  url: string;

  @IsNumber()
  store_lat: number;

  @IsNumber()
  store_lng: number;
}
