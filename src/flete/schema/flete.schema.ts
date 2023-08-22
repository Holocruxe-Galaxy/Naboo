import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/*
Guardar el acces key hasheado para luego hacerlo con filtros y poder identificar quien es el proietario o encargado del flete solicitado. Ahí podemos hacer el filtro para cuandop tenemos que hacer consultas o pedidos de algueien más.
*/
@Schema()
export class Flete extends Document {
  @Prop()
  acceso: string;

  @Prop()
  ori_lat: number;

  @Prop()
  ori_lng: number;

  @Prop()
  dir_origen: string;

  @Prop()
  des_lat: number;

  @Prop()
  des_lng: number;

  @Prop()
  dir_destino: string;

  @Prop()
  des_carga: string;

  @Prop()
  rec_nom: string;

  @Prop()
  rec_tel: number;

  @Prop()
  vehiculo: number;

  @Prop()
  reg_origen: number;

  @Prop()
  estatus: number;

  @Prop()
  servicio: number;

  @Prop()
  tipo: string;

  @Prop()
  distancia: number;

  @Prop()
  total: string;
}

export const FleteSchema = SchemaFactory.createForClass(Flete);
