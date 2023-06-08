import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
import { SharedUtilityComponent } from 'src/app/shared/components/shared-utility/shared-utility.component';
import { AppConstants } from 'src/app/shared/core/models/app-constants';
import { AppRoles } from 'src/app/shared/core/models/app-roles';
import { AppTicket, AppTicketTypes, TicketFilter } from 'src/app/shared/core/models/app-ticket';
import { AppPagination, PaginationRequest, PaginationResponse } from 'src/app/shared/core/models/pagination';
import { ApplicationRoutes } from 'src/app/shared/core/routes/app-routes';
import { TicketService } from 'src/app/shared/services/api/ticket/ticket.service';
import { CustomToastService } from 'src/app/shared/services/common/custom-toast/custom-toast.service';

@Component({
  selector: 'app-private-single-ticket',
  templateUrl: './private-single-ticket.component.html',
  styleUrls: ['./private-single-ticket.component.scss']
})
export class PrivateSingleTicketComponent extends SharedUtilityComponent implements OnInit {

  fonts = { faTicket };

  routes = ApplicationRoutes.generateRoutes();

  ticket?: AppTicket;
  tickets: AppTicket[] = [];
  appPagination = new AppPagination();
  filter = new TicketFilter();
  paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
  paginationResponse = new PaginationResponse<AppTicket[]>();

  userSections = AppConstants.UserSections;
  currentSection = this.userSections.ticketDetail;
  types = AppTicketTypes;

  roles = AppRoles;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private router: Router,
    private toast: CustomToastService,
    )
    {
    super();
  }

  override ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.filter.ticketId = id;
    this.filter.full = true;
    this.paginationRequest = new PaginationRequest<TicketFilter>(this.appPagination, this.filter);
    this.getTicket(this.currentSection);
  }

  getTicket(section: string): void {
    this.currentSection = section;
    this.isLoading = true;
    const sub = this.ticketService.getTickets(this.paginationRequest)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          if (data.totalItems <= 0) {
            this.toast.error('Ticket not found');
            this.router.navigate([this.routes.privateRoute.tickets().$absolutePath]);
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

