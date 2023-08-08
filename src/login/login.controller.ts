import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { objLogin } from 'src/store/dto/store.dto';
import { LoginService } from './login.service';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() user: objLogin) {
    try {
      return await this.loginService.Login(user);
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }
}
