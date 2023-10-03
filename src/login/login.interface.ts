export interface accessVerifyResponse {
  estatus: number;
  resultado?: {
    nombre: string;
    produccion: boolean;
  };
  mensaje?: string;
}
export interface TokenPayload {
  userId: string;
  username: string;
}
