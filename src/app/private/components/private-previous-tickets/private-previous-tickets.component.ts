import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCalendar, faFilter } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppAppointment } from 'src/app/shared/core/models/app-appointment';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppTicket, AppTicketTypes, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';

@Component({
  selector: 'app-private-previous-tickets',
  templateUrl: './private-previous-tickets.component.html',
  styleUrls: ['./private-previous-tickets.component.scss']
})
export class PrivatePreviousTicketsComponent extends SharedUtilityComponent implements OnInit {

  @Input() appointment?: AppAppointment;

  @Output() reload = new EventEmitter<string>();

  ticketTypes = Object.keys(AppTicketTypes);

  fonts = { faCalendar, faFilter };

  tickets: AppTicket[] = [];

  appPagination = new AppPagination();
  filter = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppTicket[]>();

  constructor(
    private ticketService: TicketService,
    ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.beforeDateTime = this.appointment?.appointmentDate?.toString();
    this.filter.patientId = this.appointment?.patient?.base?.id;
    this.filter.full = true;
    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTickets();
  }

  getTickets(): void {
    this.isLoading = true;
    const sub = this.ticketService.getTickets(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.paginationResponse = data;
          this.tickets = data.result || [];
        },
        error: (error) => {
          console.log(error);
        }
      });

    this.subscriptions.push(sub);
  }

  addFilter(type: string): void {

    if (type == 'all') {
      this.filter.appInventoryType = undefined;
    } else {
      this.filter.appInventoryType = type
    }

    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTickets();
   }

   pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTickets();
  }

  ticketTrackBy(index: any, ticket: AppTicket) {
    return ticket.base.id;
   }
}
