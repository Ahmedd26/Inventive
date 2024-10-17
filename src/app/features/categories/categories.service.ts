import { Injectable } from '@angular/core';
import { API } from '../../core/utils/constants.utils';
import { HttpClient } from '@angular/common/http';
import { ICategory } from './categories.model';

const ENDPOINT = `${API}categories/`;

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  get(id: number | string) {
    return this.http.get<ICategory>(ENDPOINT + id);
  }

  getAll() {
    return this.http.get<ICategory[]>(ENDPOINT);
  }

  create(category: ICategory) {
    return this.http.post<ICategory>(ENDPOINT, category);
  }

  delete(id: number | string) {
    return this.http.post<any>(`${ENDPOINT}${id}?_method=delete`, null);
  }
  update(id: number | string, body: ICategory) {
    return this.http.post<ICategory>(`${ENDPOINT}${id}?_method=put`, body);
  }
}
