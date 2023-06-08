import { SharedUtilityComponent } from './../../../shared/components/shared-utility/shared-utility.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppTicket, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';
import { finalize } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-private-edit-ticket-inventory-modal',
  templateUrl: './private-edit-ticket-inventory-modal.component.html',
  styleUrls: ['./private-edit-ticket-inventory-modal.component.scss']
})
export class PrivateEditTicketInventoryModalComponent extends SharedUtilityComponent implements OnInit {

  @Input() ticketFromParent?: AppTicket;
  @Input() type?: string;
  @Output() reload = new EventEmitter<string>();

  ticket?: AppTicket;
  tickets: AppTicket[] = [];
  appPagination = new AppPagination();
  filter = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppTicket[]>();

  constructor(
    private ticketService: TicketService,
    private toast: CustomToastService,
    private activeModal: NgbActiveModal
  ) {
    super();
  }

  override ngOnInit(): void {
    this.filter.ticketId = this.ticket?.base.id;
    this.filter.full = true;
    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTicket();
  }

  getTicket(): void {
    this.isLoading = true;
    const sub = this.ticketService.getTickets(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          if (data.totalItems <= 0) {
            this.toast.error('Ticket not found');
            this.activeModal.close();
            return;
          }
          this.paginationResponse = data;
          this.tickets = data.result ?? [];
          this.ticket = this.tickets[0];
        },
        error: (error) => {
          throw error;
        }
      });
    this.subscriptions.push(sub);
  }

}
