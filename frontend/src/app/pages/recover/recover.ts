import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recover.html',
  styleUrl: './recover.css'
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);
  
  email: string = '';
  isLoading: boolean = false;
  emailSent: boolean = false;

  onSubmit() {
    if (!this.email) return;

    this.isLoading = true;

    this.authService.requestPasswordReset(this.email).subscribe({
      next: () => {
        this.isLoading = false;
        this.emailSent = true;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert("Erro ao enviar email. Tente novamente.");
      }
    });
  }

  retry() {
    this.email = '';
    this.emailSent = false;
  }
}