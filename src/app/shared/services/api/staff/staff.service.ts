import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private apiUrl = `${environment.apiUrl}/staff`;

  constructor(private http: HttpClient) { }

  createStaff(data: any): Observable<{userId: string}> {
    return this.http.post<{userId: string}>(`${this.apiUrl}/create`, data);
  }

  editDetails(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/staff`, data);
  }

  updateRoles(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-roles`, data);
  }


  dashboardStats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard-stats`);
  }
}
