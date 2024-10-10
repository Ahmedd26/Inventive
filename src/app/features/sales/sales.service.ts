import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { ISalesOrder } from './sales.model';

const ENDPOINT = `${API}salesorders`;
@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ISalesOrder[]>(ENDPOINT);
  }

  get(id: number) {
    return this.http.get<ISalesOrder>(`${ENDPOINT}/${id}`);
  }

  update(form: ISalesOrder, id: number) {
    return this.http.post<ISalesOrder>(`${ENDPOINT}/${id}?_method=put`, form);
  }

  create(body: ISalesOrder) {
    return this.http.post<ISalesOrder>(ENDPOINT, body);
  }

  delete(id: number) {
    return this.http.delete(`${ENDPOINT}/${id}?_method=delete`);
  }
}
