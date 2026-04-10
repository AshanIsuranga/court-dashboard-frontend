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
}
