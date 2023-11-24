import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
  @Prop({ unique: true })
  access_key: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  post_code: string;

  @Prop()
  store_name: string;

  @Prop()
  url: string;

  @Prop()
  store_lat: number;

  @Prop()
  store_lng: number;

  @Prop()
  extra_comision: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
