import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';

// ENDPOINT ==> `${API}top-selling-products/:quantity`
const TOP_SELLING = `${API}top-selling-products/`;
const SALES = `${API}sales-of/`;
const WIDGETS = `${API}widgets/`;

@Injectable({
  providedIn: 'root',
})
export class chartsService {
  constructor(private http: HttpClient) {}

  topSellingProducts(quantity: number | string, days: number | string) {
    return this.http.get(`${TOP_SELLING}${quantity}/${days}`);
  }
  sales(days: number | string) {
    return this.http.get(`${SALES}${days}`);
  }
  widgets() {
    return this.http.get(WIDGETS);
  }
}
