import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/*import { LoginService } from '../login.service';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  hide: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  testData = {
    email: 'eleve',
    password: 'eleve',
  };

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((res) => {
        if (res.token) {
          this.router.navigate(['/dashboard']);
          
        }
      }, (error) => {
        this.snackBar.open('identifiant erroné', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
        })
      });
  }
}
