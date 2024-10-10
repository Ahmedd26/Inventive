import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../utils/constants.utils';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private http: HttpClient) {}

  getPurchase(id: number) {
    this.http
      .get(`${API}purchaseInvoice/${id}`, {
        responseType: 'blob',
      })
      .subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: (err) => console.error(err),
      });
  }
  getSale(id: number) {
    this.http
      .get(`${API}salesInvoice/${id}`, {
        responseType: 'blob',
      })
      .subscribe({
        next: (response: Blob) => {
          const url = window.URL.createObjectURL(response);
          window.open(url);
        },
        error: (err) => console.error(err),
      });
  }
}
