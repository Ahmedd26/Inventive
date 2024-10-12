import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../core/utils/constants.utils';
import { IInventory } from './inventory.model';


const ENDPOINT = `${API}product-warehouses`;


@Injectable({
  providedIn: 'root'
})


export class InventoryService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IInventory[]>(ENDPOINT)
  }

  get(id: number) {
    return this.http.get<IInventory>(`${ENDPOINT}/${id}`);
  }

  create(body: IInventory) {
    return this.http.post<IInventory>(`${ENDPOINT}`, body)
  }

  delete(id: number) {
    return this.http.post(`${ENDPOINT}/${id}?_method=delete`, null)
  }

  update(body: IInventory, id: number) {
    return this.http.post<IInventory>(`${ENDPOINT}/${id}?_method=put`, body);
  }

}
