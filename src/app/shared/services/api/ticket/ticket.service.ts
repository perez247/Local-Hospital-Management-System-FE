import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, Subscription } from 'rxjs';
import { AppTicket, AppTicketTypes, ITicketInventory, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { environment } from 'src/environments/environment';
import { CustomToastService } from '../../common/custom-toast/custom-toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = `${environment.apiUrl}/ticket`;

  constructor(private http: HttpClient) { }

  getTickets(data: any): Observable<PaginationResponse<AppTicket[]>> {
    return this.http.post<PaginationResponse<AppTicket[]>>(`${this.apiUrl}/get-tickets`, data);
  }

  saveTicketAndInventory(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/pharmacy-ticket-inventory`, data);
  }

  updateTicket(data: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, data);
  }

  sendAllTickets(data: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send-to-departments`, data);
  }

  sendTicketsToFinance(data: any, ticketType: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send-${ticketType}-to-finance`, data);
  }

  concludeTicket(data: any, ticketType: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/conclude-${ticketType}-ticket-inventory`, data);
  }

  deleteTicket(data: any): Observable<void> {
    return this.http.request<void>('delete', `${this.apiUrl}/app-ticket`, { body: data });
  }
}
