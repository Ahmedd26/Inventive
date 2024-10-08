import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { IPurchase } from './purchases.model';

const ENDPOINT = `${API}purchase-orders`;

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IPurchase[]>(ENDPOINT);
  }

  create(body: IPurchase) {
    return this.http.post<IPurchase>(ENDPOINT, body);
  }

  update(body: IPurchase, id: number) {
    return this.http.post<IPurchase>(`${ENDPOINT}/${id}?_method=put`, body);
  }

  delete(id: number) {
    return this.http.post(`${ENDPOINT}/${id}?_method=delete`, null);
  }
}
