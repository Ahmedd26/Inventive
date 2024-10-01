import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { ISalesOrder, IUser } from './sales.model';

const ENDPOINT = `${API}salesorders/`;
const ENDPOINTUSER = `${API}users/`;

@Injectable({
  providedIn: 'root'
})

export class SalesService {


  constructor(private http: HttpClient) { }

  getAllSales() {
    return this.http.get<ISalesOrder[]>(ENDPOINT)
  }

  getAllUsers() {
    return this.http.get<IUser[]>(ENDPOINTUSER)
  }

  updateSales(form: ISalesOrder, salesId: number) {
    return this.http.patch<ISalesOrder>(`${ENDPOINT}${salesId}`, form)
  }

  createSales(body: ISalesOrder) {
    return this.http.post<ISalesOrder>(ENDPOINT, body)
  }

  deleteSales(salesId: number) {
    return this.http.delete(`${ENDPOINT}${salesId}`)
  }
}
