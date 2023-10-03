import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  @Render('landing')
  landing() {
    return {
      title: 'Bienvenido a fex',
    };
  }
}
