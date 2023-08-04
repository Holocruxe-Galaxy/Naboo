import { IsNotEmpty, IsString } from 'class-validator';

export class objLogin {
  @IsNotEmpty()
  @IsString()
  accessKey: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}
