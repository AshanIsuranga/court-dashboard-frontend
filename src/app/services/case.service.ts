import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { environment } from './../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = `${environment.API_BASE_URL}/cases`;
  private token!: string | null;

  constructor(private http: HttpClient, private tokenSrv: TokenServiceService) {
    this.token = this.tokenSrv.getToken()
    console.log('token', this.token)
  }

  getCenterDetails(page: number = 1, limit: number = 10, province: string = '', district: string = '', search: string = ''): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-all-cases?page=${page}&limit=${limit}`;

    if (province) {
      url += `&province=${province}`;
    }

    if (district) {
      url += `&district=${district}`;
    }

    if (search) {
      url += `&searchText=${search}`;
    }

    return this.http.get(url, { headers });
  }

  getCaseDetails(caseId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-selected-case/${caseId}`;

    return this.http.get(url, { headers });
  }

  getPendingConnectionDetails(page: number = 1, limit: number = 10, searchText: string =''): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-pending-connections?page=${page}&limit=${limit}`;

    if (searchText) {
      url += `&searchText=${searchText}`
    }

    return this.http.get(url, { headers });
  }

  cerateConnection(partyId: number, userId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  
    const url = `${this.apiUrl}/create-connection`;
  
    return this.http.post(
      url,
      { partyId, userId }, // body
      { headers }          // config
    );
  }

  cerateConnectionForOrg(partyId: number, userId: number, orgId: number, orgUserId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  
    const url = `${this.apiUrl}/create-connection-for-org`;
  
    return this.http.post(
      url,
      { partyId, userId, orgId, orgUserId }, // body
      { headers }          // config
    );
  }


  rejectConnection(partyId: number, userId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  
    const url = `${this.apiUrl}/reject-connection`;
  
    return this.http.post(
      url,
      { partyId, userId }, // body
      { headers }          // config
    );
  }

  rejectConnectionForOrg(partyId: number, userId: number, orgId: number, orgUserId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  
    const url = `${this.apiUrl}/reject-connection-for-org`;
  
    return this.http.post(
      url,
      { partyId, userId, orgId, orgUserId }, // body
      { headers }          // config
    );
  }



  getDataForCreateHearing(caseId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-selected-case/${caseId}`;

    return this.http.get(url, { headers });
  }

  getOrganizationPartyUserDetails(partyId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    let url = `${this.apiUrl}/get-organization-party-details/${partyId}`;

    return this.http.get(url, { headers });
  }

  createCase(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.http.post(`${this.apiUrl}/create-case`, payload, { headers });
  }

  getApprovedConnectionDetails(page: number = 1, limit: number = 10, searchText: string =''): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-approved-connections?page=${page}&limit=${limit}`;

    if (searchText) {
      url += `&searchText=${searchText}`
    }

    return this.http.get(url, { headers });
  }

  getRejectedConnectionDetails(page: number = 1, limit: number = 10, searchText: string =''): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-rejected-connections?page=${page}&limit=${limit}`;

    if (searchText) {
      url += `&searchText=${searchText}`
    }

    return this.http.get(url, { headers });
  }

  getPendingLawyers(page: number = 1, limit: number = 10, searchText: string ='', district: string ='', province: string =''): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-pending-lawyers?page=${page}&limit=${limit}`;

    if (searchText) {
      url += `&searchText=${searchText}`
    }

    if (district) {
      url += `&district=${district}`
    }

    if (province) {
      url += `&province=${province}`
    }

    return this.http.get(url, { headers });
  }

  approveLawyer(id: number, status: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  
    const url = `${this.apiUrl}/approve-lawyer`;
  
    return this.http.post(
      url,
      { id, status }, // body
      { headers }          // config
    );
  }

  getApprovedLawyers(tab: string | null, page: number = 1, limit: number = 10, searchText: string ='', district: string ='', province: string =''): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-approved-lawyers?page=${page}&limit=${limit}&tab=${tab}`;

    if (searchText) {
      url += `&searchText=${searchText}`
    }

    if (district) {
      url += `&district=${district}`
    }

    if (province) {
      url += `&province=${province}`
    }

    return this.http.get(url, { headers });
  }
}

