import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { IWarehouse } from './warehouse.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  constructor(private http: HttpClient) {}
  createWarehouse(body: IWarehouse) {
    return this.http.post<IWarehouse>(`${API}warehouse-store`, body);
  }
  getAllWarehouses() {
    return this.http.get<IWarehouse[]>(`${API}warehouse-index`);
  }
  getWarehouse(id: number | string) {
    return this.http.get<IWarehouse>(`${API}warehouse-show/${id}`);
  }
  updateWarehouse(id: number | string, body: any) {
    return this.http.post<IWarehouse>(
      `${API}warehouse-update/${id}?_method=put`,
      body,
    );
  }
  deleteWarehouse(id: number | string) {
    return this.http.post<IWarehouse>(
      `${API}warehouse-destroy/${id}?_method=delete`,
      null,
    );
  }

  createWarehouseSection(body: any) {
    return this.http.post(`${API}warehouseSection-store`, body);
  }
}

// all the endpoints for the inventory controller
// warehouse-index
// warehouse-show/{id}
// warehouse-store
// warehouse-update/{id}
// warehouse-destroy/{id}

// warehouseSection-index
// warehouseSection-show/{id}
// warehouseSection-store
// warehouseSection-update/{id}
// warehouseSection-destroy/{id}

// productWarehouse-index
// productWarehouse-show/{id}
// productWarehouse-store
// productWarehouse-update/{id}
// productWarehouse-destroy/{id}
