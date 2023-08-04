import { Controller, Post, Body } from '@nestjs/common';
import { objLogin } from 'src/store/dto/store.dto';
import { LoginService } from './login.service';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() user: objLogin) {
    return this.loginService.Login(user);
  }
}
