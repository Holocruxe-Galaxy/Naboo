import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store } from './schema';
import { Model } from 'mongoose';
import { StoreInterface } from './store.interface';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<Store>,
  ) {}

  async createStore(store: StoreInterface): Promise<Store> {
    return await this.storeModel.create(store);
  }

  async findOne(id: string): Promise<Store> {
    return await this.storeModel.findById(id);
  }
}
