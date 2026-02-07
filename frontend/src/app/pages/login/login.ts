import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService)
  private router = inject(Router)

  user = {
    email: '',
    password: ''
  };

  onSubmit() {
    this.authService.signIn(this.user).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (e) => {
        console.log(e)
        alert("Não foi possível fazer login. Verifique usuário e senha.")
      }
    });
  }
}
