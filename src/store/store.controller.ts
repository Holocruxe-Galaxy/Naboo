import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { StoreService } from './store.service';
import { objStore, updateCommissionDto } from './dto/store.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Patch('config')
  configStore(@Body() store: objStore) {
    return this.storeService.updateStore(store);
  }
  @Patch('extra')
  addExtraCommission(@Body() commissionDto: updateCommissionDto) {
    return this.storeService.updateCommission(commissionDto);
  }
  @Get(':store_id')
  getStores(@Param('store_id') store_id: string) {
    return this.storeService.getStoreById(store_id);
  }
}
