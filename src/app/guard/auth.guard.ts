import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!localStorage.getItem('token')) {
      console.log('User not authenticated');
      this.router.navigate(['/']); // Redirect to the login page or any other appropriate page
      return false;
    }
    return true;
  }
}
