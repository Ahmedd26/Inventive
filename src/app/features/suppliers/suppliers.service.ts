import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { ISupplier } from './suppliers.model';

const ENDPOINT = `${API}suppliers`;

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ISupplier[]>(ENDPOINT);
  }
  get(id: number) {
    return this.http.get<ISupplier>(`${ENDPOINT}/${id}`);
  }
 
  create(supplierData: FormData) {
    return this.http.post<ISupplier>(ENDPOINT, supplierData);
}

  update( supplierData: FormData ,id: number) {
  return this.http.post<ISupplier>(`${ENDPOINT}/${id}?_method=put`, supplierData);
}

delete(id: number) {
  return this.http.delete<{ message: string }>(`${ENDPOINT}/${id}`);
}
}
