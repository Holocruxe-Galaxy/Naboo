import { Body, Controller, Patch } from '@nestjs/common';
import { StoreService } from './store.service';
import { objStore } from './dto/store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Patch('config')
  configStore(@Body() store: objStore) {
    console.log(store);
    return this.storeService.updateStore(store);
  }
}
