import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './users.model';
import { API } from '../../core/utils/constants.utils';
const ENDPOINT = `${API}users`;
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  get(id: number) {
    return this.http.get<IUser>(`${ENDPOINT}/${id}`);
  }
  getAll() {
    return this.http.get<IUser[]>(ENDPOINT);
  }
  create(user: IUser) {
    return this.http.post<IUser>(ENDPOINT, user);
  }

  update(user: IUser, id: any) {
    return this.http.put<IUser>(`${ENDPOINT}/${id}`, user);
  }
  delete(id: number) {
    return this.http.delete(`${ENDPOINT}/${id}`);
  }
}
