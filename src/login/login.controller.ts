import { Controller, Post, Body } from '@nestjs/common';
import { objHBLogin, objLogin } from 'src/store/dto/store.dto';
import { LoginService } from './login.service';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() user: objLogin) {
    return this.loginService.Login(user);
  }

  @Post('test')
  test(@Body() test: any) {
    console.log(test);
    return { aLaGrande: 'le puse cuca' };
  }

  @Post('fex')
  handleLogin(@Body() user: objHBLogin) {
    return this.loginService.HBLogin(user);
  }

  @Post('register-fex')
  handleRegister(@Body() user: objHBLogin) {
    return this.loginService.HBRegister(user);
  }
}
