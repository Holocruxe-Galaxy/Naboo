import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { objStore } from './dto/store.dto';

/*
 A ver. Si lo que yo tengo que hacer es crear la store cuando se registra o se logea
 tengo un problema ahí. 
 Cómo sería la configuración allí?
  
 */
@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<Store>,
    private readonly httpService: HttpService,
    private jwtService: JwtService,
  ) {}

  async createStore(store: objStore): Promise<Store> {
    const existingStore = await this.storeModel.findOne({
      access_key: store.access_key,
    });

    if (existingStore) {
      // Ya existe un Store con el mismo valor de access_key, corta la ejecución para que no se cree denuevo
      return;
    }
    return await this.storeModel.create(store);
  }

  async findOne(id: string): Promise<Store> {
    return await this.storeModel.findById(id);
  }
  async updateStore(store: objStore) {
    const storeDb = await this.storeModel.findOne({
      access_key: store.access_key,
    });
    if (storeDb) {
      // Realiza las actualizaciones necesarias en el objeto `storeDb`
      storeDb.country = store.country;
      storeDb.city = store.city;
      storeDb.address = store.address;
      storeDb.post_code = store.post_code;
      storeDb.url = store.url;
      storeDb.store_lat = store.store_lat;
      storeDb.store_lng = store.store_lng;
      // Guarda los cambios en la base de datos
      await storeDb.save();
      return 'store configured correctly';
    } else {
      throw new HttpException('store not found', HttpStatus.BAD_REQUEST);
    }
  }
}
