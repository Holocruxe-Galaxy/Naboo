import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { FexService } from './fex.service';
import { FleteService } from 'src/flete/flete.service';

@Controller('fex')
export class FexController {
  constructor(
    private readonly fexService: FexService,
    private readonly fleteService: FleteService,
  ) {}

  private fex = [
    { title: 'Inicio', link: '/fex' },
    { title: 'Empresas', link: '/fex/stores' },
  ];

  @Get('')
  @Render('fex/landing')
  showLanding(@Query('token') token: string) {
    if (!token) {
      return {
        title: 'Falta de acceso',
        error: true,
      };
    }
    return {
      title: 'Panel Control Fex',
      error: false,
      navbarOptions: {
        navbarFex: true,
        navbarMenu: this.fex,
      },
    };
  }

  @Get('stores')
  @Render('fex/stores')
  async showStores(@Query('token') token: string) {
    if (!token) {
      return {
        title: 'Falta de acceso',
        error: true,
      };
    }
    const empresas = await this.fexService.getStores();
    return {
      empresas,
      title: 'Panel Control Fex',
      error: false,
      navbarOptions: {
        navbarFex: true,
        navbarMenu: this.fex,
      },
    };
  }

  @Get('stores/:storeId')
  @Render('fex/store_detail')
  async showStoreDetail(
    @Query('storeId') storeId: string,
    @Param('token') token: string,
  ) {
    if (!token) {
      return {
        title: 'Falta de acceso',
        error: true,
      };
    }
    const store_services = await this.fexService.getStore(storeId);
    return {
      store_services,
      title: 'Panel Control Fex',
      error: false,
      navbarOptions: {
        navbarFex: true,
        navbarMenu: this.fex,
      },
    };
  }
}
