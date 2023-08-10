import { HttpException, Injectable } from '@nestjs/common';
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
    return await this.storeModel.create(store);
  }

  async findOne(id: string): Promise<Store> {
    return await this.storeModel.findById(id);
  }
  async updateStore(store: objStore) {
    try {
      return await this.storeModel.updateOne({ id: store.id }, store);
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }
}
