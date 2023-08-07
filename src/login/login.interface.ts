export interface accessVerifyResponse {
  estatus: number;
  resultado?: {
    nombre: string;
    produccion: boolean;
  };
  mensaje?: string;
}
