import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './schema';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Store.name,
        schema: StoreSchema,
      },
    ]),
    ConfigModule,
    HttpModule,
  ],
  providers: [StoreService],
  exports: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
