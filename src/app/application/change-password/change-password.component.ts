import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  isLoading = false;
  submitted = false;
  showNewPassword = false;
  showConfirmPassword = false;
  showCurrentPassword = false;

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  constructor(
    private authSrv: AuthService,
    private router: Router
  ) {}

  get passwordsMismatch(): boolean {
    return !!this.confirmPassword && this.newPassword !== this.confirmPassword;
  }

  get newPasswordTooShort(): boolean {
    return !!this.newPassword && this.newPassword.length < 8;
  }

  isFormValid(): boolean {
    return !!(
      this.currentPassword.trim() &&
      this.newPassword.length >= 8 &&
      this.confirmPassword &&
      this.newPassword === this.confirmPassword
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.isFormValid()) return;
    if (this.isLoading) return;
    this.isLoading = true;

    this.authSrv.changePassword(this.newPassword).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res?.status) {
          Swal.fire({
            icon: 'success',
            title: 'Password Updated',
            text: 'Your new password has been set. Please use it for your next login.',
            confirmButtonText: 'Continue to Dashboard',
          }).then(() => {
            this.router.navigate(['/dashbord']);
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Failed',
            text: res?.message || 'Something went wrong.',
          });
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.error || 'Server error occurred.',
        });
      }
    });
  }
}
