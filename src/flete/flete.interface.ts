export interface FleteSolicitude {
  acceso: string;
  ori_lat: number;
  ori_lng: number;
  dir_origen: string;
  des_lat: number;
  des_lng: number;
  dir_destino: string;
  des_carga: string;
  rec_nom: string;
  rec_tel: number;
  vehiculo: number;
  reg_origen: number;
  programado?: string;
  extra?: string;
  cupon: string;
}
/* export interface FleteResponse {
  orden_woo: '#85';
  numero_seg: 85;
  status_fex: '9';
  modo: 'express';
  fecha: '12/02/21';
  pago: 'completado';
}
 */
