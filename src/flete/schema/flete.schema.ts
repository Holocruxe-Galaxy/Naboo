import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Flete extends Document {
  @Prop({ unique: true })
  access_key: string;

  @Prop()
  country: string;

  @Prop()
  flete_name: string;

  @Prop()
  url: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;

  @Prop()
  address: string;
}

export const FleteSchema = SchemaFactory.createForClass(Flete);
