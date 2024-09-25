import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { type ISupplier } from './suppliers.model';

const ENDPOINT = `${API}suppliers`;

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http.get(`${ENDPOINT}/${id}`);
  }
  getAll() {
    return this.http.get<ISupplier[]>(ENDPOINT);
  }

  create(supplier: ISupplier) {
    return this.http.post<ISupplier>(ENDPOINT, supplier);
  }
  update(supplier: ISupplier, id: number) {
    return this.http.post<ISupplier>(`${ENDPOINT}/${id}?_method=put`, supplier);
  }

  delete(id: number) {
    this.http
      .post(`${ENDPOINT}/${id}?_method=delete`, null)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
