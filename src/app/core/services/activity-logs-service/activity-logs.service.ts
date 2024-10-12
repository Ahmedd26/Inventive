import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../utils/constants.utils';

const ENDPOINT = `${API}logs/user/`;

@Injectable({
  providedIn: 'root',
})
export class ActivityLogsService {
  constructor(private http: HttpClient) {}

  get(id: number) {
    return this.http.get(ENDPOINT + id);
  }
}
