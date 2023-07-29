import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { objLogin } from 'src/dto/user.dto';
@Controller('login')
export class LoginController {
  @Post()
  login(@Body() user: objLogin) {
    if (user.accessKey === 'alex' && user.country === 'Argentina') {
      return true;
    } else {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
