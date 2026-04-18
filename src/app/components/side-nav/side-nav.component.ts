import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { ThemeService } from '../../theme.service';
import { FormsModule } from '@angular/forms';
import { TokenServiceService } from './../../services/token-service.service';
// import { ToastAlertService } from '../../services/toast-alert/toast-alert.service';
// import Swal from 'sweetalert2';

export const MENU_ITEMS = [
  {
    id: 1,
    key: 'dashboard',
    path: '/dashbord',
    label: 'Dashboard',
    icon: 'fas fa-th-large',
    roles: ['Registrar', 'Clerk', 'Admin'],
  },
  {
    id: 2,
    key: 'cases',
    path: '/cases',
    label: 'Cases',
    icon: 'fa-solid fa-bullseye',
    roles: ['Registrar', 'Clerk'],
  },
  {
    id: 3,
    key: 'connections',
    path: '/connections',
    label: 'Connections',
    icon: 'fa-solid fa-user-plus',
    roles: ['Registrar', 'Clerk'],
  },

  {
    id: 4,
    key: 'hearing',
    path: '/hearing',
    label: 'Hearing',
    icon: 'fa-solid fa-user-plus',
    roles: ['Registrar', 'Clerk'],
  },

  {
    id: 5,
    key: 'courts',
    path: '/courts',
    label: 'Courts',
    icon: 'fa-solid fa-user-plus',
    roles: ['Admin'],
  },

  {
    id: 5,
    key: 'manage-officers',
    path: '/manage-officers',
    label: 'Manage-officers',
    icon: 'fa-solid fa-user-plus',
    roles: ['Registrar', 'Clerk'],
  },


];

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  isCollapsed = false;
  role: string | null = null;
  isSelectTab: string = '';
  menuItems = MENU_ITEMS;

  constructor(
    // private themeService: ThemeService,
    private router: Router,
    private tokenSrv: TokenServiceService,
    // private toastSrv: ToastAlertService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.role = tokenSrv.getUserDetails().role;
    console.log('role', this.role)
    this.menuItems = MENU_ITEMS.filter(item => item.roles.includes(this.role ?? ''));
    console.log('role', this.role)
    this.setActiveTabFromRoute();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveTabFromRoute();
      }
    });

    console.log('menuItems', this.menuItems)

  }

  private setActiveTabFromRoute(): void {
    const currentPath = this.router.url.split('?')[0];

    if (currentPath.startsWith('/profile')) {
      this.isSelectTab = '';
      return;
    }

    const activeItem = this.menuItems
      .filter(item => currentPath.startsWith(item.path))
      .sort((a, b) => b.path.length - a.path.length)[0];

    if (activeItem) {
      this.isSelectTab = activeItem.key;
    } else {
      this.selectIdealTab();
    }

    console.log('tab', this.isSelectTab)
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  // toggleTheme() {
  //   this.themeService.toggleTheme();
  // }

  // isDarkTheme(): boolean {
  //   return this.themeService.getActiveTheme() === 'dark';
  // }

  navigate(path: string, selectTab: string) {
    this.isSelectTab = selectTab;
    this.router.navigate([path]).then(() => {
      this.setActiveTabFromRoute();
    });
  }

  isTabSelected(tab: string): boolean {
    return this.isSelectTab === tab;
  }

  selectIdealTab() {
    if (this.role === 'Registrar') {
      this.isSelectTab = 'dashboard';
    } else if (this.role === 'Clerk') {
      this.isSelectTab = 'dashboard';
    } else if (this.role === 'Admin' ){
      this.isSelectTab = 'dashboard';
    }

    console.log('tab', this.isSelectTab)
  }

}
