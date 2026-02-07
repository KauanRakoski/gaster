import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private authService = inject(AuthService)
  private router = inject(Router)

  user = {
    email: '',
    password: '',
  };

  onSubmit() {
    this.authService.signUp(this.user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('Não foi possível criar uma conta. Caso já exista uma conta com este email, tente fazer login');
      }
    });
  }
}
