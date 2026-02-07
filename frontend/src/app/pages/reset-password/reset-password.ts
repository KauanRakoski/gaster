import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPasswordComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  token: string = '';
  password: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('id') || '';
    
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.password || !this.token) return;

    this.isLoading = true;

    this.authService.resetPassword(this.token, this.password)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: () => {
          alert('Password updated successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert('Invalid or expired link. Please try again.');
        }
      });
  }
}