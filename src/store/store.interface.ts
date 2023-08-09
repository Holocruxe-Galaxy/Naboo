import { ObjectId } from 'mongoose';

export interface StoreInterface {
  id: ObjectId;
  access_key: string;
  country: string;
  store_name: string;
  url: string;
  latitude: number;
  longitude: number;
  address: string;
}
