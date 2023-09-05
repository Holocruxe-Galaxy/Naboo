export interface FleteSolicitude extends FleteConsulta {
  dir_origen: string;
  dir_destino: string;

  des_carga: string;

  rec_nom: string;

  rec_tel: number;
  reg_origen: number;
  programado?: string;
  extra?: string;
  cupon?: string;
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

export interface FleteConsulta {
  acceso: string;
  ori_lat: number;
  ori_lng: number;
  des_lat: number;
  des_lng: number;
  reg_origen: number;
  vehiculo?: number;
}
export interface FleteConsultaRespuesta {
  estatus: number;
  resltado: {
    distancia: string;
    total: number;
  };
}

export interface Tranporte {
  categoría: string;
  cantidad: number;
}

export interface FexFlete {
  servicio: number;
  tipo: string;
  tiempo: number;
  estado: number;
  descripcion: string;
  conductor: Conductor;
}

interface Conductor {
  nombre: string;
  telefono: string;
  patente: string;
  tipo: string;
  posicion: Posicion;
}
interface Posicion {
  lat: number;
  lng: number;
}
