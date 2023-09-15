import { Controller, Get, Render } from '@nestjs/common';

@Controller('docs')
export class DocsController {
  private docs = {
    nav: [
      { title: 'General', link: '/docs' },
      { title: 'Configuración y uso', link: '/docs/config' },
      { title: 'Gestión de órdenes', link: '/docs/paneles' },
      { title: 'Más', link: '/docs/preguntas_frecuentes' },
    ],
    side: [
      {
        title: 'General',
        sub: [
          { title: 'Resumen', link: '/docs' },
          { title: 'Instalación y Onboarding', link: '/docs/onboard' },
          /*{ title: 'Tutoriales', link: '/docs/tutorial' }, */
        ],
      },
      {
        title: 'Configuración y uso',
        sub: [
          { title: 'Configuración de la tienda', link: '/docs/config' },
          { title: 'Flujo del Cliente', link: '/docs/flujo_cliente' },
        ],
      },
      {
        title: 'Gestión de órdenes',
        sub: [
          { title: 'Acceso a paneles', link: '/docs/paneles' },
          /* { title: 'Flujo usuario prepago', link: '/docs/flujo_usuario_pre' }, */
          /* { title: 'Flujo usuario pospago', link: '/docs/flujo_usuario_pos' }, */
        ],
      },
      {
        title: 'Más',
        sub: [
          { title: 'Preguntas frecuentes', link: '/docs/preguntas_frecuentes' },
          { title: 'Fex', link: 'https://fex.cl/' },
        ],
      },
    ],
  };

  @Get('')
  @Render('external/docs_1')
  showDocs() {
    return {
      title: 'Documentación de Fex',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
    };
  }

  @Get('onboard')
  @Render('external/docs_2')
  showOnboard() {
    return {
      title: 'Documentación de Fex - Instalación y Onboarding',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
      buttons: {
        prev: { title: 'Resumen', link: '/docs' },
        next: { title: 'Configuración de la tienda', link: '/docs/config' },
      },
    };
  }

  @Get('tutorial')
  @Render('external/docs_3')
  showTutorial() {
    return {
      title: 'Documentación de Fex - Tutoriales',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
      buttons: {
        prev: { title: 'Instalación y Onboarding', link: '/docs/onboard' },
        next: { title: 'Configuración de la tienda', link: '/docs/config' },
      },
    };
  }

  @Get('config')
  @Render('external/docs_4')
  showConfig() {
    return {
      title: 'Documentación de Fex - Configuración de la tienda',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
      buttons: {
        prev: { title: 'Instalaciónn y Onboarding', link: '/docs/onboard' },
        next: { title: 'Flujo del cliente', link: '/docs/flujo_cliente' },
      },
    };
  }

  @Get('flujo_cliente')
  @Render('external/docs_5')
  showFlujoCliente() {
    return {
      title: 'Documentación de Fex - Flujo del Cliente',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
      buttons: {
        prev: { title: 'Configuración de la tienda', link: '/docs/config' },
        next: { title: 'Acceso a paneles', link: '/docs/paneles' },
      },
    };
  }

  @Get('paneles')
  @Render('external/docs_6')
  showPaneles() {
    return {
      title: 'Documentación de Fex - Acceso a paneles',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
      buttons: {
        prev: { title: 'Flujo del Cliente', link: '/docs/flujo_cliente' },
        next: {
          title: 'Preguntas frecuentes',
          link: '/docs/preguntas_frecuentes',
        },
      },
    };
  }

  @Get('flujo_usuario_pre')
  @Render('external/docs_7')
  showFlujoPre() {
    return {
      title: 'Documentación de Fex - Flujo de usuario Pre-pago',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
      buttons: {
        next: '',
        prev: '',
      },
    };
  }

  @Get('flujo_usuario_pos')
  @Render('external/docs_8')
  showFlujoPos() {
    return {
      title: 'Documentación de Fex - Flujo de usuario Post-pago',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
      buttons: {
        next: '',
        prev: '',
      },
    };
  }

  @Get('preguntas_frecuentes')
  @Render('external/docs_9')
  showFrecuentes() {
    return {
      title: 'Documentación de Fex - Preguntas Frecuentes',
      navbarOptions: {
        navbarFex: false,
        navbarMenu: this.docs.nav,
        sidebarMenu: this.docs.side,
      },
      buttons: {
        prev: { title: 'Acceso a paneles', link: '/docs/paneles' },
        next: { title: 'Fex', link: 'https://fex.cl' },
      },
    };
  }
}
