import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { FleteService } from 'src/flete/flete.service';
import { StoreService } from 'src/store/store.service';

@Injectable()
export class FexService {
  constructor(
    private readonly httpService: HttpService,
    private readonly storeService: StoreService,
    private readonly fleteService: FleteService,
  ) {}

  async getStores() {
    try {
      const stores = await this.storeService.getStores();
      //StoresMap debería ser un arreglo de Stores con el nombre adress y total
      const storesMap = stores.map(async (store) => {
        const servicios = await this.fleteService.getFletesByAccKey(
          store.access_key,
        );
        let total = 0;
        if (servicios.length > 0) {
          total = servicios
            .map((servicio) => servicio.total)
            .reduce((a, b) => {
              const valorNumerico = parseFloat(b);
              return a + valorNumerico;
            }, 0);
        }
        return {
          id: store._id,
          store_name: store.store_name,
          address: store.address,
          post_code: store.post_code,
          city: store.city,
          total,
        };
      });

      const promisedStores = await Promise.all(storesMap);

      return promisedStores;
    } catch (error) {
      console.log(error);
    }
  }

  async getStore(id: string) {
    try {
      const store = await this.storeService.getStoreById(id);
      const services = await this.fleteService.getFletesByAccKey(
        store.access_key,
      );
      const servicesMap = services.map((serv) => {
        return {
          id: serv._id,
          servicio: serv.servicio,
          dir_origen: serv.dir_origen,
          dir_destino: serv.dir_destino,
          des_carga: serv.des_carga,
          rec_nom: serv.rec_nom,
          rec_tel: serv.rec_tel,
          vehiculo: serv.vehiculo,
          tipo: serv.tipo,
          distancia: serv.distancia,
          total: serv.total,
          estado: serv.estado,
        };
      });
      return servicesMap;
    } catch (error) {
      console.log(error);
    }
  }
}
