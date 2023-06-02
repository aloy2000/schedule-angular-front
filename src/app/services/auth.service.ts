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
          console.log("response:", response.id)
          this.loggedIn = true;
          localStorage.setItem('token', response?.token);
          localStorage.setItem('role', response?.role);
          localStorage.setItem('id', response?.id)
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
    localStorage.removeItem('id');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  register(user: User) {
    return this.http.post<any>(`http://localhost:3000/auth/register`, user)
      .pipe(
        tap((response: any) => {

        }),
        catchError((error: any) => {
          return throwError(error);
        })
      )
  }
}

type Role = 'eleve' | 'professeur';
export type User = {
  nom: string
  email: string;
  address: Address;
  telephone: string;
  password: string;
  userType: Role;
}

export type Address = {
  rue: string;
  numero: string;
  codePostale: number;
  ville: string;
  pays: string;
}
