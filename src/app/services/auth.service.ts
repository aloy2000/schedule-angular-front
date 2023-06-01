import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError, catchError} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;

  constructor(private http: HttpClient) {}

   login(email: string, password: string) {
    return this.http
      .post<any>('http://localhost:3000/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.loggedIn = true;
          localStorage.setItem('token', response?.token);
          localStorage.setItem('role', response?.role);
        }),
        catchError((error: any) => {
          this.loggedIn = false;
          return throwError(error);
        })
      );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
