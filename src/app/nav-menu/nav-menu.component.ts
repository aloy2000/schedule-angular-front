import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [AuthService],
})
export class NavMenuComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
