import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap, throwError} from 'rxjs';
import {LoginResponse} from '../models/login-response.type';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8081/auth"

  constructor(private readonly httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
        sessionStorage.setItem("username", value.name);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error); // Re-throw the error to handle it further up the chain
      })
    );
  }

  signup(name: string, username: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { name, username, password }).pipe(
      tap((value) => {
      })
    )
  }

  logout() {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
  }

  changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    const token = sessionStorage.getItem('auth-token');
    const headers = token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;

    return this.httpClient.post(`${this.apiUrl}/change-password`, {
      currentPassword,
      newPassword,
      confirmNewPassword
    }, {
      headers,
      responseType: 'text'
    });
  }

}
