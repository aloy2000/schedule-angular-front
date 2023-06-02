import { Component } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService],
})
export class RegisterComponent {
  hide: boolean = true;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  registerForm: FormGroup = this.fb.group({
    nom: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    userType: [''],
    telephone: ['', [Validators.required]],
    rue: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    codePostale: ['', [Validators.required]],
    ville: ['', [Validators.required]],
    pays: ['', [Validators.required]],
  });

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const newUser: User = {
      nom: this.registerForm.value.nom,
      email: this.registerForm.value.email,
      address: {
        codePostale: this.registerForm.value.codePostale,
        numero: this.registerForm.value.numero,
        pays: this.registerForm.value.pays,
        rue: this.registerForm.value.rue,
        ville: this.registerForm.value.ville,
      },
      password: this.registerForm.value.password,
      telephone: this.registerForm.value.telephone,
      userType: this.registerForm.value.userType,
    };

    console.log('data:', newUser);
    this.authService.register(newUser).subscribe(
      (res) => {
        if (res) {
          this.router.navigate(['']);
        }
      },
      (error) => {
        this.snackBar.open("Une erreur s'est produite", 'Close', {
          duration: 2000,
          verticalPosition: 'top',
        });
      }
    );
  }

  backToLogin() {
    this.router.navigate(['']);
  }
}
