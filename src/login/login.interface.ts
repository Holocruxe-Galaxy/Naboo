export interface accessVerifyResponse {
  estatus: number;
  resultado?: {
    nombre: string;
    produccion: boolean;
  };
  mensaje?: string;
}
export interface TokenPayload {
  storeAccess: string;
  country: string;
}
