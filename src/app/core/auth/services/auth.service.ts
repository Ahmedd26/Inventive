import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { API } from '../../utils/constants.utils';
import type {
  AuthResponseData,
  LoginData,
  RegistrationData,
} from './../models/auth.model';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthResponseData | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  register(registrationData: RegistrationData) {
    return this.http
      .post<AuthResponseData>(`${API}register`, registrationData)
      .pipe(
        tap((resData: AuthResponseData) => {
          this.handleAuthentication(resData);
        })
      );
  }

  login(loginData: LoginData) {
    return this.http.post<AuthResponseData>(`${API}login`, loginData).pipe(
      tap((resData: AuthResponseData) => {
        this.handleAuthentication(resData);
      })
    );
  }

  private handleAuthentication(userData: AuthResponseData) {
    this.user.next(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;
    const userDataObject = JSON.parse(userData);
    this.user.next(userDataObject);
  }

  logout() {
    const userJson = localStorage.getItem('userData');
    let localStorageUser: AuthResponseData;

    if (userJson) {
      localStorageUser = JSON.parse(userJson);
      console.log(localStorageUser);

      const headers = new HttpHeaders({
        Accept: 'application/json',
        Authorization: `Bearer ${localStorageUser.token}`,
      });

      this.http.get(`${API}logout`, { headers }).subscribe(
        (response) => {},
        (error) => {}
      );
    }
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/']);
  }
}
