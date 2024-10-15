import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ACCESS_TOKEN } from '../constants';
import { AuthResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private readonly authUrl = environment.apiUrl
  private readonly authUrl = '/auth';

  constructor(private http: HttpClient) {}

  login(): Observable<AuthResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    const body = new URLSearchParams();

    body.set('grant_type', 'password');
    body.set('client_id', 'app-cli');
    body.set('username', 'r_test@fintatech.com');
    body.set('password', 'kisfiz-vUnvy9-sopnyv');

    return this.http.post<AuthResponse>(`${this.authUrl}`, body, { headers }).pipe(
      tap((res: AuthResponse) => {
        const { access_token } = res;

        console.log('res', res);
        localStorage.setItem(ACCESS_TOKEN, access_token);
      }),
      catchError((err) => {
        console.error('Login failed: ', err);

        return throwError(err);
      }),
    );
  }

  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }
}
