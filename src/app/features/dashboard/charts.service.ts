import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';

// ENDPOINT ==> `${API}top-selling-products/:quantity`
const ENDPOINT = `${API}top-selling-products/`;

@Injectable({
  providedIn: 'root',
})
export class chartsService {
  constructor(private http: HttpClient) {}

  topSellingProducts(quantity: number | string, days: number | string) {
    return this.http.get(`${ENDPOINT}${quantity}/${days}`);
  }
}
