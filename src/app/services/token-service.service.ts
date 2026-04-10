import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private readonly TOKEN_KEY         = 'CMSLoginToken';
  private readonly IS_OFFICER_KEY    = 'CMSisOfficer';
  private readonly IS_ADMIN_KEY      = 'CMSisAdmin';
  private readonly OFFICER_ID_KEY    = 'CMSofficerId';
  private readonly ADMIN_ID_KEY      = 'CMSadminId';
  private readonly OFFICER_CODE_KEY  = 'CMSofficerCode';
  private readonly USERNAME_KEY      = 'CMSuserName';
  private readonly OFFICER_ROLE_KEY  = 'CMSofficerRole';  // 'Registrar' | 'Clerk' | null
  private readonly COURT_ID_KEY      = 'CMScourtId';
  private readonly EXPIRATION_KEY    = 'CMStokenExpiration';

  constructor() {}

  // ─── Save ────────────────────────────────────────────────────────────────────

  saveAdminDetails(
    token: string,
    userName: string,
    adminId: string,
    officerRole: string,
    expiresIn: number,
    courtid: number,
  ): Promise<void> {
    return new Promise((resolve) => {
      const expiration = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem(this.TOKEN_KEY,        token);
      localStorage.setItem(this.IS_ADMIN_KEY,     'true');
      localStorage.setItem(this.IS_OFFICER_KEY,   'false');
      localStorage.setItem(this.ADMIN_ID_KEY,     adminId);
      localStorage.setItem(this.USERNAME_KEY,     userName);
      localStorage.setItem(this.OFFICER_ID_KEY,   '');
      localStorage.setItem(this.OFFICER_CODE_KEY, '');
      localStorage.setItem(this.OFFICER_ROLE_KEY, officerRole);
      localStorage.setItem(this.COURT_ID_KEY,     '');
      localStorage.setItem(this.EXPIRATION_KEY,   expiration.toString());
      resolve();
    });
  }

  saveOfficerDetails(
    token: string,
    officerCode: string,
    officerId: string,
    officerRole: 'Registrar' | 'Clerk',
    expiresIn: number,
    courtid: number,
  ): Promise<void> {
    return new Promise((resolve) => {
      const expiration = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem(this.TOKEN_KEY,        token);
      localStorage.setItem(this.IS_OFFICER_KEY,   'true');
      localStorage.setItem(this.IS_ADMIN_KEY,     'false');
      localStorage.setItem(this.OFFICER_ID_KEY,   officerId);
      localStorage.setItem(this.OFFICER_CODE_KEY, officerCode);
      localStorage.setItem(this.OFFICER_ROLE_KEY, officerRole);
      localStorage.setItem(this.COURT_ID_KEY,     courtid.toString());
      localStorage.setItem(this.USERNAME_KEY,     '');
      localStorage.setItem(this.ADMIN_ID_KEY,     '');
      localStorage.setItem(this.EXPIRATION_KEY,   expiration.toString());
      resolve();
    });
  }

  // ─── Read ─────────────────────────────────────────────────────────────────────

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAdmin(): boolean {
    return localStorage.getItem(this.IS_ADMIN_KEY) === 'true';
  }

  isOfficer(): boolean {
    return localStorage.getItem(this.IS_OFFICER_KEY) === 'true';
  }

  isRegistrar(): boolean {
    return localStorage.getItem(this.OFFICER_ROLE_KEY) === 'Registrar';
  }

  isClerk(): boolean {
    return localStorage.getItem(this.OFFICER_ROLE_KEY) === 'Clerk';
  }

  getUserDetails(): {
    isAdmin: boolean;
    isOfficer: boolean;
    adminId: string | null;
    officerId: string | null;
    officerCode: string | null;
    role: string | null;
    courtId: string | null;
    tokenExpiration: string | null;
  } {
    return {
      isAdmin:         localStorage.getItem(this.IS_ADMIN_KEY)     === 'true',
      isOfficer:       localStorage.getItem(this.IS_OFFICER_KEY)   === 'true',
      adminId:         localStorage.getItem(this.ADMIN_ID_KEY)     || null,
      officerId:       localStorage.getItem(this.OFFICER_ID_KEY)   || null,
      officerCode:     localStorage.getItem(this.OFFICER_CODE_KEY) || null,
      role:     localStorage.getItem(this.OFFICER_ROLE_KEY) || null,
      courtId:         localStorage.getItem(this.COURT_ID_KEY)     || null,
      tokenExpiration: localStorage.getItem(this.EXPIRATION_KEY)   || null,
    };
  }

  // ─── Expiry ───────────────────────────────────────────────────────────────────

  isTokenExpired(): boolean {
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (!expiration) return true;
    return new Date().getTime() > parseInt(expiration, 10);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  // ─── Clear ────────────────────────────────────────────────────────────────────

  clearLoginDetails(): Promise<void> {
    return new Promise((resolve) => {
      [
        this.TOKEN_KEY,
        this.IS_OFFICER_KEY,
        this.IS_ADMIN_KEY,
        this.OFFICER_ID_KEY,
        this.ADMIN_ID_KEY,
        this.OFFICER_CODE_KEY,
        this.OFFICER_ROLE_KEY,
        this.COURT_ID_KEY,
        this.EXPIRATION_KEY,
      ].forEach(key => localStorage.removeItem(key));
      resolve();
    });
  }
}