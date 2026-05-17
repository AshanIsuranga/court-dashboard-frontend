import { CommonModule, DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { TokenServiceService } from '../../services/token-service.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {
  showPassword: boolean = false;
  loginObj: Login;
  disError: any;
  isLoading: boolean = false;
  role!: string;
  currentYear = new Date().getFullYear();


  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenServiceService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loginObj = new Login();
  }

  ngOnInit() {
    // this.tokenService.clearLoginDetails();
    // this.clearAllCookies();
  }



  clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }


  }



  onLogin() {
    if (!this.loginObj.userName) {
      Swal.fire({
        icon: 'error',
        title: 'Unsuccessful',
        text: 'User Name is required',
        customClass: {
          popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white rounded-lg',
          title: 'dark:text-white',
          
        }
      });
    }

    if (!this.loginObj.password) {
      Swal.fire({
        icon: 'error',
        title: 'Unsuccessful',
        text: 'Password is required',
        customClass: {
          popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white rounded-lg',
          title: 'dark:text-white',
          
        }
      });

    }

    if (!this.loginObj.userName && !this.loginObj.password) {
      Swal.fire({
        icon: 'error',
        title: 'Unsuccessful',
        text: 'Officer Code / User Name and Password is required',
        customClass: {
          popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white rounded-lg',
          title: 'dark:text-white',
          
        }
      });

    }

    if (this.loginObj.password && this.loginObj.userName) {
      this.isLoading = true;
      this.authService.login(this.loginObj.userName, this.loginObj.password).subscribe(
        (res: any) => {

          if (res.role === 'Registrar' || res.role === 'Clerk' ) {
            this.tokenService.saveOfficerDetails(
              res.token,
              res.userName,
              res.officerId,
              res.role,
              res.expiresIn,
              res.courtid
            );
  
          } else {
            this.tokenService.saveAdminDetails(
              res.token,
              res.userName,
              res.adminId,
              res.role,
              res.expiresIn,
              res.courtid
            );
          }
        
          Swal.fire({
            icon: 'success',
            title: 'Logged',
            text: 'Successfully Logged In',
            showConfirmButton: false,
            timer: 1500,
           
          });

          this.role = res.role;

          setTimeout(() => {
            if (res.updatedPassword == 0 && res.role !== 'Admin') {
              this.router.navigate(['/change-password']);
              this.isLoading = false;
            } else if (res.updatedPassword == 1 || res.role === 'Admin') {
              if (this.role === 'Registrar') {
                this.router.navigate(['/dashbord']);
                this.isLoading = false;
              } else if (this.role === 'Clerk') {
                this.router.navigate(['/dashbord']);
                this.isLoading = false;
              } else if (this.role === 'Admin') {
                this.router.navigate(['/dashbord']);
                this.isLoading = false;
              }

            } else {
              Swal.fire({
                icon: 'error',
                title: 'Unsuccessful',
                text: 'Error occurred.',
                customClass: {
                  popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white rounded-lg',
                  title: 'dark:text-white',
                  
                }
              });
              this.isLoading = false;
            }
          }, 0);
        },
        (error) => {
          this.isLoading = false;
          console.error('Error ', error);
          this.disError = error.error?.error || 'An error occurred. Please try again.';
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessful',
            text: this.disError,
            customClass: {
              popup: 'bg-white dark:bg-[#363636] text-gray-800 dark:text-white rounded-lg',
              title: 'dark:text-white',
              
            }
          });
        }
      );
    }

  }



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  changeFavicon(iconUrl: string) {
    const link: HTMLLinkElement = this.document.querySelector("link[rel*='icon']") || this.document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconUrl;
    this.document.getElementsByTagName('head')[0].appendChild(link);
  }
}


export class Login {
  userName: string;
  password: string;

  constructor() {
    this.userName = '';
    this.password = '';
  }

}