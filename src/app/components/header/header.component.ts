import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenServiceService } from '../../services/token-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  userImage: string | null = null;
  logOutView = false;

  constructor(
    private router: Router,
    private tokenSrv: TokenServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // const userDetails = this.tokenSrv.getUserDetails();
    // this.userImage = userDetails.image;
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  logOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.logOutView = !this.logOutView;
    }
  }

  confirmLogOut() {
    this.logOutView = false;
    this.tokenSrv.clearLoginDetails();
    this.router.navigate(['login']);
  }

  cancelLogOut() {
    this.logOutView = false;
  }
}
