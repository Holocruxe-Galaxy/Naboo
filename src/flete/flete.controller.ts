import { Controller, Get, Res } from '@nestjs/common';

@Controller('flete')
export class FleteController {
  @Get()
  getOrders() {
    const data = [
      {
        orden_woo: '#85',
        numero_seg: '85',
        status_fex: '9',
        modo: 'express',
        fecha: '12/02/21',
        pago: 'completado',
      },
      {
        orden_woo: '#87',
        numero_seg: '87',
        status_fex: '16',
        modo: 'programado',
        fecha: '12/02/21',
        pago: 'completado',
      },
      {
        orden_woo: '#99',
        numero_seg: '99',
        status_fex: ' 14',
        modo: 'express',
        fecha: '12/02/21',
        pago: 'pendiente',
      },
      {
        orden_woo: '#85',
        numero_seg: '85',
        status_fex: ' 9',
        modo: 'express',
        fecha: '12/02/21',
        pago: 'completado',
      },
      {
        orden_woo: '#87',
        numero_seg: '87',
        status_fex: '2',
        modo: 'programado',
        fecha: '12/02/21',
        pago: 'completado',
      },
      {
        orden_woo: '#99',
        numero_seg: '99',
        status_fex: '0',
        modo: 'express',
        fecha: '12/02/21',
        pago: 'pendiente',
      },
    ];

    // Retornar un JSON en la respuesta
    return data;
  }
}
