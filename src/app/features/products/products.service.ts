import { API } from './../../core/utils/constants.utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from './products.model';

const ENDPOINT = `${API}products/`;

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<IProduct[]>(ENDPOINT);
  }

  createNewProduct(product: IProduct) {
    return this.http.post<IProduct>(ENDPOINT, product);
  }
  
  delete(productID: any) {
    return this.http.delete(ENDPOINT + productID);
  }
}
