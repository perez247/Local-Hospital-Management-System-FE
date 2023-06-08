import { Component, OnInit } from '@angular/core';
import { faTicket, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppTicket, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { PrivateFilterTicketsComponent } from '../../modals/private-filter-tickets/private-filter-tickets.component';

@Component({
  selector: 'app-private-finance-tickets',
  templateUrl: './private-finance-tickets.component.html',
  styleUrls: ['./private-finance-tickets.component.scss']
})
export class PrivateFinanceTicketsComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faTicket, faEllipsisV }

  routes = ApplicationRoutes.generateRoutes();

  tickets: AppTicket[] = [];
  appPagination = new AppPagination();
  filter = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppTicket[]>();

  constructor(
    private ticketService: TicketService,
    private modalService: NgbModal,
  ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.sentToDepartment = true;
    this.filter.sentToFinance = true;
    this.filter.appTicketStatus = 'ongoing';
    this.filter.paymentStatus = ['pending', 'owing'];
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
          this.tickets = data.result ?? [];
        },
        error: (error) => {
          throw error;
        }
      });
    this.subscriptions.push(sub);
  }

  pageChanged(e: number) {
    this.appPagination.pageNumber = e;
    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTickets();
  }

  openFilterTicketModal(): void {
    const modalRef = this.modalService.open(PrivateFilterTicketsComponent, { size: 'lg' });
    modalRef.componentInstance.filter = this.filter;
    modalRef.componentInstance.keepState = {
      paymentStatus : ['pending', 'owing']
    };

    const sub = modalRef.componentInstance.newFilter.subscribe({
      next: (filter: TicketFilter) => {
        this.filter = filter;
        this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
        this.getTickets();
      }
    });
    this.subscriptions.push(sub);
  }
}
