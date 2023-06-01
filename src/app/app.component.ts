import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLogged: boolean = localStorage.getItem('token') ? true : false;
  title = 'projet-planing-angular';

  constructor() {
    
  }

}
