import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { IPurchase, IUser } from './purchases.model';


const ENDPOINT = `${API}purchase-orders/`;
const ENDPOINTUSER = `${API}users/`;


@Injectable({
  providedIn: 'root'
})


export class PurchasesService {

  constructor(private http: HttpClient) { }

  getAllPurchases() {
    return this.http.get<IPurchase[]>(ENDPOINT)
  }

  getAllUsers() {
    return this.http.get<IUser[]>(ENDPOINTUSER)
  }

  createPurchase(body: IPurchase) {
    return this.http.post<IPurchase>(ENDPOINT, body)
  }

  updatePurchase(body: IPurchase, purchaseId: number) {
    return this.http.patch<IPurchase>(`${ENDPOINT}${purchaseId}`, body)
  }

  deletePurchase(purchaseId: number) {
    return this.http.delete(`${ENDPOINT}${purchaseId}`)
  }
}
