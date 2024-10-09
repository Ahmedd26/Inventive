import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../core/utils/constants.utils';
import { IWarehouse } from './warehouse.model';



const ENDPOINT = `${API}warehouses`;

@Injectable({
  providedIn: 'root'
})


export class WarehouseService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IWarehouse[]>(ENDPOINT)
  }

  get(id: number) {
    return this.http.get<IWarehouse>(`${ENDPOINT}/${id}`);
  }

  create(body: IWarehouse) {
    return this.http.post<IWarehouse>(`${ENDPOINT}`, body)
  }

  delete(id: number) {
    return this.http.post(`${ENDPOINT}/${id}?_method=delete`, null)
  }

  update(body: IWarehouse, id: number) {
    return this.http.post<IWarehouse>(`${ENDPOINT}/${id}?_method=put`, body);
  }


}
