import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
  @Prop({ unique: true })
  access_key: string;

  @Prop()
  country: string;

  @Prop()
  store_name: string;

  @Prop()
  url: string;

  @Prop()
  store_lat: number;

  @Prop()
  store_lng: number;

  @Prop()
  address: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
