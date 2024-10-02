import { API } from './../../core/utils/constants.utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './products.model';

const ENDPOINT = `${API}products`;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IProduct[]>(ENDPOINT);
  }

  get(id: number) {
    return this.http.get<IProduct>(`${ENDPOINT}/${id}`);
  }

  create(product: FormData) {
    return this.http.post<IProduct>(ENDPOINT, product);
  }

  delete(id: number) {
    return this.http.delete<any>(`${ENDPOINT}/${id}`);
  }
}
