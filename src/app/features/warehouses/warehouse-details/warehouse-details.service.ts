import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../core/utils/constants.utils';
import { IWarehouseDetails } from './warehouse-details.model';

const ENDPOINT = `${API}warehouse-sections`;

@Injectable({
  providedIn: 'root'
})


export class WarehouseDetailsService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<IWarehouseDetails[]>(ENDPOINT)
  }

  get(id: number) {
    return this.http.get<IWarehouseDetails>(`${ENDPOINT}/${id}`);
  }

  create(body: IWarehouseDetails) {
    return this.http.post<IWarehouseDetails>(`${ENDPOINT}`, body)
  }

  delete(id: number) {
    return this.http.post(`${ENDPOINT}/${id}?_method=delete`, null)
  }

  update(body: IWarehouseDetails, id: number) {
    return this.http.post<IWarehouseDetails>(`${ENDPOINT}/${id}?_method=put`, body);
  }

}
