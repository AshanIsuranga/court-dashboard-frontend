import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenServiceService } from './../token-service.service';
import { environment } from './../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedleService {
  private apiUrl = `${environment.API_BASE_URL}/schedules`;
  private token!: string | null;

  constructor(private http: HttpClient, private tokenSrv: TokenServiceService) {
    this.token = this.tokenSrv.getToken()
    console.log('token', this.token)
  }

  getDataForCreateHearing(caseId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    console.log('token', this.token)

    let url = `${this.apiUrl}/get-case-details-for-hearing/${caseId}`;

    return this.http.get(url, { headers });
  }

  createHearing(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  
    const url = `${this.apiUrl}/create-hearing`;
  
    return this.http.post(
      url,
      { payload }, // body
      { headers }          // config
    );
  }

  createHearingnew(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  
    const url = `${this.apiUrl}/create-hearing`;
  
    return this.http.post(
      url,
      {},
      { headers }          // config
    );
  }
}
