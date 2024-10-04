import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../utils/constants.utils';
import { type IRole } from './roles.model';

const ENDPOINT = `${API}roles`;

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<IRole[]>(ENDPOINT);
  }

  get(id: number) {
    return this.http.get<IRole[]>(`${ENDPOINT}/${id}`);
  }
  create(role: IRole) {
    return this.http.post<IRole[]>(ENDPOINT, role);
  }

  update(id: number, role: IRole) {
    return this.http.post<IRole[]>(`${ENDPOINT}/${id}?_method=put`, role);
  }

  delete(id: number) {
    return this.http.post<IRole[]>(`${ENDPOINT}/${id}?_method=delete`, null);
  }
}
