import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppSetting } from 'src/app/shared/core/models/app-setting';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private apiUrl = `${environment.apiUrl}/setting`;

  constructor(private http: HttpClient) { }

  getSettings(): Observable<IAppSetting[]> {
    return this.http.get<IAppSetting[]>(`${this.apiUrl}`);
  }

  updateSetting(data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}`, data);
  }
}
