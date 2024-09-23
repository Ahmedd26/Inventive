import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { type ISuppliers } from './suppliers.model';

const ENDPOINT = `${API}suppliers`;

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ISuppliers[]>(ENDPOINT);
  }

  create(supplier: ISuppliers) {
    return this.http.post<ISuppliers>(ENDPOINT, supplier);
  }
}
